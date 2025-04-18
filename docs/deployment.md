# Deploy Application on AWS

## Launch instance (DevTinder-web-dev)

1- taka a machine on rent (eg: ec2 instance for that | Elastic Compute) - Virtual Server
2- default - 0 instance running
   - we need to launch a new instance  ( means launch a server)
3- Click on Launch Instance
   - Give a name eg: DevTinder-web-dev
   - it will ask you to OS on this instance to install 
      eg: Amazon Linux, macos, Ubuntu, Windows, ...
      preferred: Ubuntu (most company used the same)
   - Go down till you find 'Instance Type'
4- Instance Type
   - by default offerring free Tier T2 | Keep the same for now later on we can upgrade
5- Key Pair Login 
   - click on create 
   - enter key-pair name eg: DevTinder-web-dev-secret
   - Keep RSA & .pem (default)
   - click to create
   - .pem file will be downloaded (its a like a key to access your instance or server)

5- Network Setting  - No touch for now
   - Create Security Group (Default select)
6 - Keep all default now
7- Click  Launch instance (it will take time a bit to launch)
8- Go to instance
   - Look for instance eg: DevTinder-web-dev
   - instance state : running
   - Status Check : wait to complete intitalisation if you are new
9- Try to login into this instance or machine with SSH-Command

Note - if you want to see the info of machine then click on instance id 


## Connect to machine or instance
 1. one machine info screen where we came from instance > instance id
 2. Look for connect 
 3. Click on Connect 
 4. Here you will see ways to connect
    - will choose to SSH

### Using SSH How to connect
 1. Locate .pem file in your system which you have downloaded
 2. Change the permission for this file with following command
    ```
       chmod 400 <pem-file>.pem
    ```
 3. ssh -i "DevTinder-web-dev-secret.pem" ubuntu@ec2-16-171-235-188.eu-north-1.compute.amazonaws.com
    Note : you have to be on folder where .pem file is located
 4. once above done : we will get the linux terminal
    eg: ubuntu@ip-172-31-22-122
 5. its a fresh machine right , and we want to setup frontend , so we need to install node for react
    - install correct version of node eg: identify which version you can using on local to run that project
 6. Clone the Project from git | we can clone multiple project here right now did one 
 7. on Production , 
    - we create build first then start the project | on dev we run 'npm run dev' not work here
 8. Create Build 
    - npm install (if node_modules not there)
    - npm run build
 9. We need nginx - to make deployment | it acts as web server | create http server
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx   => for start nginx
    - sudo systemctl enable nginx
    - Copy Build from /dist to nginx server (/var/www/html)
      - sudo scp -r dist/* /var/www/html
      - done
    - how to verify
       - go to instance
       - click instance-id
       - look for Public IPv4 address
       - copy ip to access our web application 
       - but you will not see application running if setting up first time
          - because => AWS block the port : which is port 80 of our instance
          - on instance info => go to security
          - go to security group
          - add inbound rule to allow access port number 80 => click on edit inbound rule
          - click => add rule 
          - give port range = 80  with HTTP
          - give 0.0.0.0 for allow from anywhere 
          - save rules
          - wait for some time - and check again public -ip
          - later on will map with this domain



