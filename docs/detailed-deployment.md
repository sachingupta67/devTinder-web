

# 🚀 Deploy React Frontend on AWS EC2 (Ubuntu + Node.js + Nginx)

## ✅ What We're Doing:
We are deploying a production-ready React frontend app on a virtual machine (EC2 instance) using **Ubuntu** OS. We'll:
- Install **Node.js** to build the frontend
- Use **Nginx** to serve static files
- Configure security rules to allow web traffic

---

## 1. Launch EC2 Instance (`DevTinder-web-dev`)

### ➤ What is an EC2 instance?
EC2 (Elastic Compute Cloud) is a **virtual server** in AWS cloud, where we can host applications like on any physical server.

### Step-by-Step:
1. Go to **EC2 Dashboard** → Click **Launch Instance**
2. Set instance name: `DevTinder-web-dev`
3. OS: **Ubuntu** – common Linux OS, widely used for production
4. Instance type: **t2.micro** – Free Tier eligible, suitable for small apps
5. Key Pair:
   - Used to securely SSH (login) into the instance
   - Download `.pem` file and **keep it safe**
6. Leave **Network Settings** and **Storage** as default
7. Click **Launch Instance**
8. Go to **Instances** → wait for:
   - `Instance State: running`
   - `Status Check: passed` (means it's ready to use)

---

## 2. Connect to EC2 via SSH

### ➤ What is SSH?
SSH (Secure Shell) lets you remotely access the server terminal from your local computer.

### Commands:
```bash
chmod 400 DevTinder-web-dev-secret.pem
# Makes the key file secure

ssh -i "DevTinder-web-dev-secret.pem" ubuntu@<your-ec2-public-dns>
# Connects to the instance using the key
```

---

## 3. Install Node.js

### ➤ Why Node.js?
React projects use Node.js to install packages and build the project. We only need Node to **build the frontend**, not run it.

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v && npm -v  # Check versions
```

---

## 4. Clone and Build Project

### ➤ Why Build?
React apps use tools like Vite or Create React App to generate a `dist` or `build` folder with **static HTML/CSS/JS** files. These are what we actually deploy.

```bash
git clone <your-repo-url>       # Download your code
cd <project-folder>
npm install                     # Install project dependencies
npm run build                   # Creates production-ready files in dist/
```

---

## 5. Install and Configure Nginx

### ➤ What is Nginx?
Nginx is a **web server** that can serve static files like HTML, CSS, and JS. It listens on port 80 and delivers your website to users.

```bash
sudo apt update
sudo apt install nginx
sudo systemctl start nginx      # Start the server
sudo systemctl enable nginx     # Auto-start on reboot
```

---

## 6. Deploy Build Files

### ➤ Where are files served from?
Nginx serves files from `/var/www/html` by default. So we place our build files there.

```bash
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html
```

---

## 7. Open Port 80 (HTTP)

### ➤ Why Port 80?
Port 80 is the default for HTTP websites. AWS blocks it by default — we need to allow it manually.

### Steps:
1. Go to EC2 → Click Instance ID → Click **Security Group**
2. Click **Edit Inbound Rules** → **Add Rule**
   - Type: **HTTP**
   - Port: `80`
   - Source: `0.0.0.0/0` → allows anyone to access it
3. Save rules

---

## 8. Access Your App 🎉

Visit in browser:  
```text
http://<your-public-ip>
```

You should now see your deployed frontend app.

---
