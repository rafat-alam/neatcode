# 🧠 NeatCode

[![Live](https://img.shields.io/badge/Live%20Site-Click%20Here-brightgreen?style=flat-square)](https://neatcode.onrender.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

NeatCode is a sleek, full-stack platform inspired by LeetCode that helps users practice coding problems with a built-in code editor, organized problem list, and live collaboration features.

🚀 **Live Site:** https://neatcode.onrender.com/  
📦 **GitHub Repo:** https://github.com/rafat-alam/neatcode

---

## 🖥️ Features

- 📝 Monaco-powered **code editor** with custom settings
- 📚 Structured problem list with difficulty levels
- ✅ Instant code submission (stubbed for now)
- 🧩 Formatted problem description and test cases
- 🗨️ **Room-based real-time chat** (Socket.IO)
- 🎨 Theme, font size, and tab size settings
- 🔐 Secure auth using **NextAuth.js**
- 🧪 Admin panel for problem management

---

## 🧱 Tech Stack

| Frontend            | Backend             | Other Tools                     |
|---------------------|---------------------|----------------------------------|
| Next.js (App Router)| Node.js + Express   | TailwindCSS, ShadCN UI          |
| TypeScript          | MongoDB + Mongoose  | Socket.IO, NextAuth             |
| Monaco Editor       | REST API            | JWT, Vercel, Render             |

---

## 📸 Screenshots

> *(Add screenshots of the editor, problem view, and messaging here)*

---

## 📦 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/rafat-alam/neatcode.git
cd neatcode
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env.local` file in the root and add:
```env
MONGODB_URI=your-mongodb-connection-uri
NEXTAUTH_SECRET=your-nextauth-secret
BRAVO_USER=your-smtp-user
BRAVO_PASS=your-smtp-password
```

### 4. Start the Development Server
```bash
npm run dev
```
Open http://localhost:3000 in your browser to view the app.

---

## 📁 Folder Structure

```
/src
  /app            → Next.js App Router pages & layout
  /components     → Editor, UI panels, modals
  /models         → Mongoose schemas
  /lib            → DB & utility functions
  /api            → API routes (problem, auth, etc.)
  /styles         → Tailwind CSS & custom styles
```

---

## 🚧 Roadmap

- [x] Problem list with CRUD
- [x] Integrated Monaco code editor
- [x] Editor setting panel (theme, font size, tabs)
- [x] Real-time chat in rooms
- [ ] Code execution API (upcoming)
- [ ] Add test case evaluation support
- [ ] Add contest & leaderboard features

---

## 🛡️ License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements

- **LeetCode** – for UI & concept inspiration
- **Monaco Editor**
- **NextAuth.js**
- **Socket.IO**
- **Tailwind CSS**

---

## 👤 Author

**Rafat Alam**  
🔗 GitHub: [@rafat-alam](https://github.com/rafat-alam)

Made with ❤️, TypeScript, and too much coffee ☕
