function Cloud(username, password, repo)
{
    this.user = username;
    this.repoName = repo;

    this.contents = {};

    this.init = function(doneFunc, errorFunc)
    {
        this.github = new Github({
            username: this.user,
            password: password,
            auth: "basic"
        });

        this.repo = this.github.getRepo(this.user, this.repoName);

        // validate username/password
        var self = this;
        this.repo.show(function(err, repo) {
            if (err != null)
            {
                console.log(err);
                var message = "Failed to connect to repo " + self.user + "/" + self.repoName + "<br/>" + err.error;
                if (err.error == 401)
                    message += ": Invalid username or password";
                errorFunc(message);
            }
            else
            {
                doneFunc();
            }
        });
    }

    this.content = function(filename)
    {
        if (filename in this.contents)
            return this.contents[filename];
        else
            return null;
    }

    this.makeGuid = function() 
    {
        var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
        return guid;
    }

    this.getUrl = function(filename)
    {
        return "https://github.com/" + this.user + "/" + this.repoName + "/blob/master/" + filename;
    }

    this.extractErrorMessage = function(error)
    {
        if (error.request != null && error.request.responseText != null)
        {
            var message = JSON.parse(error.request.responseText).message;
            if (message.indexOf("Update is not a fast forward") >= 0) message += "<br>Please reload the page and try syncing again.";
            return message;
        }
        return "Unknown";
    }

    this.publish = function(filename, content, doneFunc, errorFunc)
    {
        var self = this;

        // always re-init self to hack around "Update is not a fast forward" error
        self.init();

        this.repo.write('master', filename, content, 'Updates ' + self.makeGuid(), function(err) {
            if (err != null)
            {
                console.log(err);
                var message = self.extractErrorMessage(err);
                errorFunc(message);
            }
            else
            {
                self.contents[filename] = content;
                doneFunc(content);
            }
        });
    }

    this.refreshContent = function(filename, doneFunc, errorFunc)
    {
        var self = this;

        if (this.repo == null)
        {
            errorFunc("Failed to connect to github repo: " + this.user + "/" + this.repoName);
            return;
        }
        
        this.repo.read('master', filename, function(err, content) 
        {
            if (err == "not found")
            {
                console.log(err);
                self.contents[filename] = "";
                doneFunc("");
            }
            else if (err != null)
            {
                console.log(err);
                errorFunc(self.extractErrorMessage(err));
            }
            else
            {
                self.contents[filename] = content;
                doneFunc(content);
            }
        });
    }

    this.getDiff = function(filename, localContent, doneFunc, errorFunc)
    {
        this.refreshContent(filename, 
            function(gitContent)
            {
                var diff = new Diff(gitContent, localContent);
                doneFunc(diff);
            },
            function(error)
            {
                errorFunc(error);
            }
        );    
    }  
}

function Diff(beforeCsvStr, afterCsvStr)
{
    var beforeCsv = beforeCsvStr != null ? (beforeCsvStr.csvToArray({ rSep:'\n', cSep: ',', trim:true })) : [];
    var afterCsv = afterCsvStr.csvToArray({ rSep:'\n', cSep: ',', trim:true });

    this.rows = [];
    
    this.findMatchingRow = function(wantRow, inCsv)
    {
        for (var i=0; i<inCsv.length; i++)
        {
            var row = inCsv[i];
            if (wantRow[0] == row[0] && wantRow[1] == row[1])
                return row;
        }
        return null;
    }

    // changed/added rows
    for (var i=0; i<afterCsv.length; i++)
    {
        var afterRow = afterCsv[i];
        var beforeRow = this.findMatchingRow(afterRow, beforeCsv);
        this.rows.push(new DiffRow(beforeRow, afterRow));
    }

    // removed rows
    for (var i=0; i<beforeCsv.length; i++)
    {
        var beforeRow = beforeCsv[i];
        var afterRow = this.findMatchingRow(beforeRow, afterCsv);
        if (afterRow == null)
            this.rows.push(new DiffRow(beforeRow, null));
    }

    this.changed = [];
    this.added = [];
    this.removed = [];
    for (var i=0; i<this.rows.length; i++)
    {
        var row = this.rows[i];
        if (row.changed) this.changed.push(row);
        if (row.added) this.added.push(row);
        if (row.removed) this.removed.push(row);
    }
}

function DiffRow(beforeRow, afterRow)
{
    this.beforeRow = beforeRow;
    this.afterRow = afterRow;
    this.selected = null;
    this.added = (this.beforeRow == null);
    this.removed = (this.afterRow == null);
    if (!this.added && !this.removed)
        this.changed = this.beforeRow[2] != this.afterRow[2];
    else
        this.changed = false;
}
