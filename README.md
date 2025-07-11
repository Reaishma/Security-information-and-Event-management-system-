

# SIEM Security Operations Center

##  overview 

A comprehensive Security Information and Event Management (SIEM) simulation platform that provides a unified interface for monitoring security events, threat intelligence, network traffic, and user behavior across multiple enterprise security platforms.



## 🚀 Features

### Multi-Platform SIEM Simulation
- **IBM QRadar** - Security offense management and real-time monitoring
- **Splunk** - Advanced search capabilities and machine learning analytics
- **ELK Stack** - Elasticsearch queries and Kibana visualizations
- **Wireshark** - Network packet analysis and traffic monitoring
- **AlienVault** - Threat intelligence feeds and behavioral analysis

### Real-Time Security Monitoring
- ⚡ Live WebSocket connections for real-time event streaming
- 📊 Dynamic dashboard updates with configurable refresh intervals
- 🔔 Cross-platform event correlation and alerting
- 🤖 Machine learning-powered anomaly detection

### Advanced Analytics
- 📈 Statistical analysis of network traffic patterns
- 🎯 Behavioral analysis for user activity monitoring
- 🛡️ Threat intelligence correlation and risk scoring
- 📋 Comprehensive security event logging and analysis

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript for type-safe development
- **Tailwind CSS** with custom SIEM-specific color schemes
- **shadcn/ui** components built on Radix UI primitives
- **TanStack Query** for efficient server state management
- **Wouter** for lightweight client-side routing

### Backend
- **Node.js** with Express.js server framework
- **TypeScript** with ES modules for modern development
- **WebSocket** support for real-time data streaming
- **Drizzle ORM** with PostgreSQL schema definitions
- **Zod** for runtime data validation

### Development Tools
- **Vite** for fast development and optimized builds
- **tsx** for TypeScript execution in Node.js
- **ESBuild** for production builds
- **Replit** deployment integration

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- PostgreSQL database (optional - uses in-memory storage by default)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/siem-security-operations-center.git
cd siem-security-operations-center
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
# Database Configuration (Optional)
DATABASE_URL=postgresql://username:password@localhost:5432/siem_db

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 🚀 Live Demo 
 
[view live demo](https://reaishma.github.io/Security-information-and-Event-management-system-/)



## 📖 Usage Guide

### IBM QRadar Interface
- Monitor active security offenses and risk scores
- View real-time events per second and network flows
- Analyze high-priority security incidents
- Track network activity and blocked attempts

### Splunk Search Interface
- Execute advanced search queries using SPL syntax
- Monitor machine learning alerts and anomalies
- Analyze event timelines and source distributions
- View index health and processing status

### ELK Stack Visualization
- Write Elasticsearch queries for log analysis
- Monitor Logstash pipeline status (Input → Filter → Output)
- View Kibana-style data visualizations
- Track index health and data storage metrics

### Wireshark Network Analysis
- Simulate live packet capture and analysis
- Monitor protocol distribution and traffic statistics
- Detect network anomalies and security threats
- Analyze packet-level network communications

### AlienVault Threat Intelligence
- Monitor active threats and vulnerability feeds
- Analyze indicators of compromise (IOCs)
- Track behavioral patterns and anomaly scores
- Correlate threat intelligence across platforms

## 🏗️ Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions and configurations
├── server/                # Backend Express application
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Data storage interface
│   └── vite.ts           # Vite development integration
├── shared/               # Shared TypeScript definitions
│   └── schema.ts         # Database schema and types
└── standalone-siem-dashboard.html  # Standalone HTML version
```

## 🔧 Configuration

### Custom Color Schemes
The SIEM platform uses a custom color palette optimized for security operations:

```css
--siem-blue: hsl(214, 84%, 56%)      /* Primary actions */
--siem-green: hsl(142, 76%, 36%)     /* Success states */
--siem-amber: hsl(43, 96%, 56%)      /* Warnings */
--siem-red: hsl(0, 84%, 60%)         /* Critical alerts */
--siem-purple: hsl(263, 70%, 50%)    /* Special indicators */
--siem-dark: hsl(220, 13%, 9%)       /* Background */
--siem-gray: hsl(215, 16%, 17%)      /* Cards and panels */
```

### Database Schema
The application uses a comprehensive security-focused database schema:

- **Security Events** - Capture security incidents with metadata
- **Threat Intelligence** - Store IOCs with confidence scores
- **Network Traffic** - Record packet-level network data
- **User Behavior** - Track user actions for anomaly detection
- **Users** - Basic user management system

## 🔌 API Endpoints

### Security Events
- `GET /api/security-events` - Retrieve security events
- `POST /api/security-events` - Create new security event
- `GET /api/security-events/severity/:severity` - Filter by severity

### Threat Intelligence
- `GET /api/threat-intelligence` - Retrieve threat intelligence
- `POST /api/threat-intelligence` - Add new threat indicator

### Network Traffic
- `GET /api/network-traffic` - Retrieve network traffic data
- `POST /api/network-traffic` - Log network activity

### User Behavior
- `GET /api/user-behavior` - Retrieve user behavior data
- `GET /api/user-behavior/anomalous` - Get anomalous activities

### Analytics
- `GET /api/analytics/dashboard-stats` - Get dashboard statistics

## 🎯 Mock Data Generation

The platform includes comprehensive mock data generators for:

- **Security Events** - Simulated cyber attacks and incidents
- **Threat Intelligence** - IOC feeds from multiple sources
- **Network Traffic** - Realistic packet capture data
- **User Behavior** - Normal and anomalous user activities

## 🔒 Security Features

### Event Correlation
- Cross-platform security event correlation
- Machine learning-powered threat detection
- Risk scoring based on multiple factors
- Real-time alert generation

### Anomaly Detection
- Statistical analysis of user behavior patterns
- Network traffic anomaly identification
- Threat intelligence correlation
- Confidence scoring for security alerts

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

### Environment Variables
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:pass@host:5432/db
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use the existing component patterns
- Maintain consistent code formatting
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **IBM QRadar** - For security operations inspiration
- **Splunk** - For advanced analytics concepts
- **Elastic Stack** - For data visualization patterns
- **Wireshark** - For network analysis methodologies
- **AlienVault/AT&T Cybersecurity** - For threat intelligence frameworks

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the example configurations

## 🔮 Future Enhancements

- [ ] Integration with real threat intelligence feeds
- [ ] Advanced machine learning models
- [ ] Custom dashboard creation
- [ ] Export functionality for reports
- [ ] Multi-tenant support
- [ ] Advanced user role management
- [ ] Real-time collaboration features


Sample Output 📄

For a detailed sample output, refer to the https://docs.google.com/document/d/1Xs-NkrRz17O_hRUcnsyCGO2Khw0Rscb86bTaC1X5khU/edit?usp=drivesdk.



Author 👩‍💻

Reaishma N


---

**Built for Security Professionals** | **Powered by Modern Web Technologies** | **Open Source**