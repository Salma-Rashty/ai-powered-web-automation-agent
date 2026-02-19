# AI-powered Web Automation Agent

An intelligent local automation system designed to:

- Inject a floating control panel into any active website
- Trigger automated browser workflows
- Execute form interactions using Playwright
- Display structured automation logs inside the panel
- Support multiple visual modes (Light & Hacker)

---

## 🧠 Project Goal

This project aims to build a local AI-assisted browser automation agent that can:

1. Inject a dynamic, draggable control panel into existing web pages  
2. Communicate with a local backend service  
3. Execute browser automation tasks programmatically  
4. Capture and display execution results in real time  
5. Serve as a foundation for intelligent document-driven automation workflows  

---

## 🏗 Architecture (Local Prototype)

- `chrome-extension/` → Floating control panel injected into web pages  
- `backend/` → Flask API server handling automation requests  
- `automation/` → Playwright browser automation bot  
- `ai-engine/` → (Planned) Document classification & validation logic  

System Flow:

Chrome Extension → Flask Backend → Playwright Automation Engine  

All components run locally.

---

## 🚀 Development Phase

Phase 1 (Completed):

- Local environment setup  
- Flask backend integration  
- Playwright automation bot  
- Chrome extension UI injection  
- Draggable & snap-to-edge floating panel  
- Collapsible side toggle  
- Light Mode & Hacker Mode support  

Phase 2 (Planned):

- Real-time log streaming  
- Document upload & validation system  
- Application type detection  
- Multi-site automation logic  

---

## ⚠ Disclaimer

This project is for educational and prototyping purposes only.  
Automation must respect website terms of service and should not bypass security mechanisms.

---

## Status

✅ Chrome extension injection working  
✅ Backend communication established  
✅ Automation execution functional  
🚧 Intelligent document processing layer in progress  
