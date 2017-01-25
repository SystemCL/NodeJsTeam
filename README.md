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
	- request
	- jsontoxml

###How to install:###
	
	If you would use this project, you will need to install:

	- NodeJs - [https://nodejs.org/en/] then download and install it.
	- npm - (node package manager) comes with nodejs
	- express - install this package with npm using terminal. Ex: npm install express
	- mongodb - install this package with npm using terminal. Ex: npm install mongodb
	- redis - install this package with npm using terminal. Ex: npm install redis
	- request - install this package with npm using terminal. Ex: npm install request
	- jsontoxml - install this package with npm using terminal. Ex: npm install jsontoxml
	- Also, you will need to install MongoDB on your OS: [https://www.mongodb.com/download-center] choose install package according your OS, after that install it.
	- You will need to install Redis on your OS: [https://redis.io/download]
	choose install package according your OS, after that install it.
======================================================



###How to run project###

*	1)  According to your OS, you should open and read HowToRunOnMac/HowToRunOnWindows files
*	2)  After that, you should start file runMac: sh runMac (if your OS is from MAC)
*   3)  If you use Windows OS, you should open runWindows.bat with an text editor and edit all directories locations(save changes)
*   4)  After point 3, you will be able to run the file runWindows.bat by double click on it
*   5)  Enter into your broswer next url: http://localhost:9000/
*   6)  Choose between Insert form and Request form and fill text areas, after that press button Insert/Request
*   7)  In case of Request form the result is displayed on another page
*   8)  In case of Insert form, the result is an reload of page that tells you if data was inserted

Attention: If you have some troubles with running on ports that are already in use,(for OSX) use command: killAll node