# SyncDocs 🔄

**SyncDocs** is a real-time collaborative document editing system inspired by Google Docs.  
It demonstrates distributed system design, conflict-free collaboration, and cloud-native deployment.

## 🚀 Features
- 🔗 **Real-time collaboration** via WebSockets & CRDT (Yjs)
- 👥 **Multi-user editing** with live cursors & presence tracking
- 🛡 **Authentication & Authorization** using JWT (RBAC roles: owner, editor, viewer)
- 📜 **Version control & audit logs** powered by Kafka event sourcing
- ⚡ **Low-latency updates** with Redis Pub/Sub & distributed caching
- 📊 **Observability & Monitoring** with Prometheus, Grafana, OpenTelemetry
- ☁️ **Cloud-native deployment** on AWS (EKS, RDS, ElastiCache, S3, Terraform)

## 🛠 Tech Stack
- **Backend**: Java 17, Spring Boot, WebSocket, Redis, Kafka, PostgreSQL
- **Frontend**: React, Next.js, TipTap (ProseMirror), Yjs
- **Infrastructure**: Docker, Kubernetes, AWS (EKS, RDS, ElastiCache), Terraform
- **Monitoring**: Prometheus, Grafana, OpenTelemetry
- <img width="1458" height="976" alt="image" src="https://github.com/user-attachments/assets/8471ca0b-8807-4c8a-bad2-c06016071aab" />

## 📈 Roadmap
1. ✅ Real-time text sync with WebSocket  
2. ✅ Conflict resolution with Yjs CRDT  
3. ✅ User authentication (JWT + RBAC)  
4. 🔄 Document history & replay (Kafka + Postgres)  
5. 🔄 Metrics dashboards (Prometheus + Grafana)  
6. 🔄 AWS deployment with CI/CD (GitHub Actions + Terraform)

## 📸 Demo
*(coming soon)* – Demo GIF showing two users editing the same document in real-time.

---

### Why SyncDocs?
Unlike standard CRUD projects (e.g., e-commerce or food delivery apps), SyncDocs highlights:
- **Distributed systems engineering** (WebSockets, Redis, Kafka, CRDTs)  
- **Cloud-native skills** (Docker, Kubernetes, AWS, Terraform)  
- **System observability & reliability** (Prometheus, Grafana, OpenTelemetry)  

This makes it an ideal project to showcase backend, full-stack, and cloud engineering skills for **North America SDE roles**.
