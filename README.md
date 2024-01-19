# intention-monorepo-all

Intention Mono Repo with frontend and backend

Make sure Expo is installed, and also have everything you need to be able to test
on IOS and Android

Make sure python is up to date
Install Venv (vitural environment library from python)

Just read, don't make an environment, I have already made one
https://docs.python.org/3/library/venv.html

I have set it up where the enviroment we will be using is named venv. After everything installed this
is how you run the project

Open the project, and open two terminals, one for intention-frontend and the other for flask-server.

Starting with flask-server enter "source venv/bin/activate" to start the virtual machine.

**Note, use `pip3 install -r requirements.txt` prior to trying to start server to ensure you have required dependencies installed (raj)**

Then to start the server run "python3 server.py". You can test if this is working by using postman and testing API routes... I found this very helpful when troubleshooting what was going wrong in our code lol https://www.postman.com/

**Note, use `npm i` prior to trying to use npm start to ensure you have all the packages installed (raj)**

then in the intention-frontend terminal run "npm start" and it will give you options on which device you want to start running your project for....

#access to the database 

prerequisites --> 
make sure planetscale cli is setup (do all setup in your virtual enviroment)
https://planetscale.com/docs/concepts/planetscale-environment-setup

1. We can’t upload the .env file to GitHub due to security risks, and thus you must create your own .env file after pulling from the repo:
2. Create .env file in the flask-server directory (the directory for our backend server)
3. Go into confluence and in the file called database setup the creditals will be there. Can't uploard to github bc of security issues. 

**Note, You may also need to change the path for self.ssl_ca = '/etc/ssl/cert.pem' in db.py depending on your operating system. The default value is for mac, for other platforms look below: ** 

https://planetscale.com/docs/concepts/secure-connections <- further documentation >

