### 📌 **LUMAA TASK MANAGER**  
_Lumaa task manager, it is the coding challege which was given by lumaa company_

![Project Preview](https://res.cloudinary.com/dcrolfqsj/image/upload/v1739865530/ukzdks0ikyunha8e1ecx.png)  

---

## 🚀 **Getting Started**  
Follow these steps to set up and run the project on your local machine.

### **Prerequisites**  
- [Node.js](https://nodejs.org/) (Ensure you have Node.js installed)
- [Git](https://git-scm.com/)
- Package Manager: `npm` or `yarn` (Choose one)

---

## 📂 **Backend Setup**  

### **Step 1: Clone the Repository**  
```bash
git clone https://github.com/FazliddinFayziev/lumaa-spring-2025-swe
cd lumaa-spring-2025-swe
```

### **Step 2: Create `.env` File**  
Before starting the backend, create a `.env` file in the root directory. 
.env is being shared only purpose of check, otherwise I would never share any secret data!!! 
Here’s an example of what the `.env` file should contain:  
```env
PGHOST='ep-divine-paper-a4pnjryv-pooler.us-east-1.aws.neon.tech'
PGDATABASE='neondb'
PGUSER='neondb_owner'
PGPASSWORD='npg_HB8qwKUPZO5r'
JWT_SECRET=278e2ad23d26e8583c2f5689cc972be2657f65f01a2f3c921687d10b96af359ff31a8cebd56300430260da81427ade7f1a185fe3a56ccc0a988384a53d71f5104d2d0cdd1799e2d106f830a9be34675dbac9dcd9b92cdafd63d4ee615b0d3559e1ae88c1a2c98384538d8775b2b23ac6c7a10ab1f5ba54917a319a74dd607269a14e01aff840faa85f67eaee2b5a8549e4a3714a51cef1233d4a5baa51e762f6d86c4b81c1ec02e2ccacc30cb1f8146f37ec082133f6f38984c1042c99d9da6d809587adaf5d5116b8c138fbedfeca547a699bef66ceaeb8ce6e89f4e26f5be09f46da7ad5116800dcd1846d185cc3036e1275724bd73814e43ac7198b2e54a1
```

### **Step 3: Install Dependencies**  
```bash
cd backend
npm install
```

### **Step 4: Start the Backend Server**  
```bash
npm start
```
Your backend will now run at `http://localhost:5000`.

---

## 🎨 **Frontend Setup**  

### **Step 1: Navigate to the Frontend Directory**  
```bash
cd frontend
```

### **Step 2: Install Dependencies**  
```bash
npm install
```

### **Step 3: Start the Frontend Server**  
```bash
npm run dev
```
Your frontend will be available at `http://localhost:5173` (or another port if assigned).

---

## 📸 **Project Screenshots**  

### **Homepage Preview**  
![Homepage_1](https://res.cloudinary.com/dcrolfqsj/image/upload/v1739865727/m2dezvub6mhun3exlc5s.png)  
![Homepage_2](https://res.cloudinary.com/dcrolfqsj/image/upload/v1739865530/ukzdks0ikyunha8e1ecx.png)  

### **Task Management UI**  
![Auth_1](https://res.cloudinary.com/dcrolfqsj/image/upload/v1739865727/tdohaz3gvk0hpejr7yd6.png)  
![Auth_2](https://res.cloudinary.com/dcrolfqsj/image/upload/v1739865728/jcri4al32a3shukfsh9t.png)  

---

## ✅ **Features**  
✔️ User Authentication (Login/Signup)  
✔️ Task Management (Create, Edit, Delete, Toggle Complete)  
✔️ JWT-based Secure API  
✔️ Responsive UI with Material-UI  

---

## 📖 **API Endpoints**  

### **Authentication**  
- `POST /auth/login` → User Login  
- `POST /auth/signup` → Register New User  

### **Tasks**  
- `GET /tasks` → Fetch all tasks  
- `POST /tasks` → Create a task  
- `PUT /tasks/:id` → Update a task  
- `DELETE /tasks/:id` → Remove a task  

---

## 🔗 **Contact & Support**  
For any issues, reach out via [GitHub](https://github.com/FazliddinFayziev). 
