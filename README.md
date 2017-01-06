# NodeJsTeam
###Proxy server with load balancing + datawarehouse###
======================================================
Team:
-	Ploaia Vladislav
- 	Tabirta Adrian
-	Frunze Iacob
-	Ganta Veceslav

###Requirements:###
	- NodeJs version 4.+ for run
	- npm
	- express
	- mongodb (module and install into system)
	- redis (module and install into system)
	- http

###How to install:###
	
	If you would use this project, you will need to install:

	- NodeJs - [https://nodejs.org/en/] then download and install it.
	- npm - (node package manager) comes with nodejs
	- express - install this package with npm using terminal. Ex: npm install express
	- mongodb - install this package with npm using terminal. Ex: npm install mongodb
	- redis - install this package with npm using terminal. Ex: npm install redis
	- http - install this package with npm using terminal. Ex: npm instal http
	- Also, you will need to install MongoDB on your OS: [https://www.mongodb.com/download-center] choose install package according your OS, after that install it.
	- You will need to install Redis on your OS: [https://redis.io/download]
	choose install package according your OS, after that install it.
======================================================



###Running project###

*	1) (For Windows) Run redis-cli.exe
*	2) (For Windows) In cmd: "path_where_installed_MongoDB/mongod.exe" --dbpath "path_to_project/data"
*	3) (For Windows) In another cmd: path_where_installed_MongoDB/mongo.exe
*   4) Run Datawarehouse using terminal: node dw.js
*   5) Run Proxy: node proxy.js
*   6) Open your browser, and type http://localhost/persons/   