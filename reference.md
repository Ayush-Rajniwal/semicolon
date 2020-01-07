### Our Repository name 

# semicolon

### Branches 
*	master
*	UI
*	cap

### Command to create a new branch and switch to that branch as well
```$ git checkout -b branchName```

### Command to create a branch(but not switching to it)
```$ git branch branchName```

### Command to switch to an existing branch
```$ git checkout branchName```

### Command to push 
```$ git push```

### Command to pull
```$ git pull```

### Command to delete branch from repo
```git push origin --delete branchName```

### Command to delete branch from local system
```git branch -d branchName```

### Turning Https to http
1. Install openssl from [here](https://sourceforge.net/projects/openssl/).
2. Run below command in the folder where your server file is located (*app.js*)
3. ``` openssl genrsa -out privkey.pem 1024 ```
4. ```openssl req -new -key key.pem -out csr.pem```
5. ```openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem```

