HOW TO INSTALL:

1. Clone the repo
2. Hit npm install in the clone directory (warn big file: around 800mb)
3. Go to ( https://drive.google.com/drive/folders/1o9IHyBytaonPPA3YlYsFy8-WZJUrfZGB?usp=sharing ) and download .env for both frontend and backend. (open each folder named exactly frontend and backend);
4. for env backend, paste it on the folder Apps > backend. Don'f forget to rename the extention (occurs in windows) it in case it's just env instead of .env
5. Please change the .env for backend on DEFAULT_ADMIN_ID and DEFAULT_ADMIN_PASS to your own PostgreSQL admin account;
6. Run command: npx prisma migrate dev --name init on the directory: apps > backend.
7. for env frontend, paste it on the folder Apps > frontend. Don'f forget to rename the extention (occurs in windows) it in case it's just env instead of .env
8. go back to project folder root directory and hit command: npx turbo dev
9. If you prefer to use global turbo cli (recommended), you can install it by hitting command: npm install turbo --global. And then just type turbo dev in your cmd
10. Open backend in port 3000: http://localhost:3000/
11. Open frontend in port 4500: http://localhost:4500/

// If something went wrong
* Try to delete cookies for this website if the error related to user data (eg: saving favourite city);
* Check the internet connection if you have issues on getting the weather / forecast data
* make sure you use node > 18 when installing the project
* try delete the node_modules, and reinstall the project

Made with 💖 with these stacks:
- Javascript & Typescript
- NestJS
- NextJS / ReactjS
- Prisma
- Postgresql
- turbo monorepo


Created Dec 2024
Author: bravee_98
Contact: revaldiovie3@gmail.com | https://github.com/ovierevaldi