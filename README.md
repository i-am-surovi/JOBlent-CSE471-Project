# Vite Project Setup         
**npm create vite@latest**

# Tailwind Setup       
**npm install tailwindcss @tailwindcss/vite** 

# Client Setup        
**npm install**       
- Add Routing : **npm install react-router-dom**        
- To display Notification : **npm install react-toastify**   
- Add Richtext Editor for Course Description : **npm install quill**   

# Clerk Setup
- **npm install @clerk/clerk-react**  [For Frontend]        
- **npm install @clerk/express**  [For Backend]

# Server Setup     
**npm init -y** 
**npm install**   
- Create Backend : **express** 
- Restart Backend Server after changes : **nodemon**  
- Use Environment Variables (cloudinary, mongodb) : **dotenv**   
- Connect Backend with any other domain: **cors**
- Store images : **cloudinary**    
- Connect MongoDB Database : **mongoose** 
- Upload any image : **multer**          
- Webhooks for sending real-time info: **svix**
## Run These Commands
- npm i express
- npm i jsonwebtoken
- npm i bcrypt
- npm i mongoose nodemon svix@1.42.0
- npm i cors multer dotenv cloudinary


# ReUse After Cloning    
## For Client 
- npm install react-router-dom quill react-toastify   
- npm install    
- npm run dev     
- create **.env** file and paste it there VITE_CLERK_PUBLISHABLE_KEY=pk_test_cG93ZXJmdWwtbW90aC03MC5jbGVyay5hY2NvdW50cy5kZXYk   
- npm install @clerk/clerk-react

## For Server         
- npm install express nodemon dotenv cors cloudinary mongoose multer stripe svix@1.42.0 @clerk/express         
- npm run server
   
# For Push to the repository       
- git clone https://github.com/i-am-surovi/JOBlent-CSE471-Project.git      
- cd JOBlent-CSE471-Project

### First Create a Brunch 
- git checkout -b feature-name

### Then after working on codes     
- git add .      
- git commit -m "done something"      
- git fetch origin    
- git rebase origin/main       
- git push origin feature-name

### In-case of update any branch code  
- git checkout feature/feature-name       
- git add .         
- git commit -m "Updated something in the feature successfully"      
- git push origin feature/feature-name

# After Other's Update use this command       
- git fetch origin       
- git checkout main      
- git pull origin main

# After Merging code      
- git add .      
- git commit -m "done something"        
- git pull --rebase origin main      
- git push origin main

# In Case of facing problem       
- git remote -v    
- git fetch origin       
- git checkout main     
- git reset --hard origin/main

# Marquee
- npm install react-fast-marquee

# K-Converter
- npm i k-convert

# Moment
- npm i moment

# Quill
- npm i quill


