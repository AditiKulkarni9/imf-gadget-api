# 📡 IMF Gadget API

The **IMF Gadget API** is a RESTful service that allows managing and tracking high-tech gadgets. It supports operations such as listing, creating, updating, and decommissioning gadgets, along with a **mission success probability** feature.

---

## 🚀 Live API
🔗 **Base URL:** [IMF Gadget API on Render](https://imf-gadget-api-17pq.onrender.com)

---

## 📖 API Documentation
🔗 **Postman Documentation:** [View API Docs](https://documenter.getpostman.com/view/xxxxx)  
---

## ⚙️ Features
- ✅ **Retrieve gadgets with mission success probability**
- ✅ **Filter gadgets by status (`Available`, `Destroyed`, `Decommissioned`)**
- ✅ **Add new gadgets**
- ✅ **Update gadget status**
- ✅ **Decommission gadgets instead of deleting them**
- ✅ **Trigger self-destruct sequence**

---

## 🔥 API Endpoints

### 📌 **1️⃣ Get All Gadgets**
```http
GET /gadgets
