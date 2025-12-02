# JobRadar — Remote Job Hunter

A modern, high-performance Next.js application that helps you find hidden remote job opportunities by searching directly on company ATS platforms using advanced Google search operators.

![Next.js](https://img.shields.io/badge/Next.js-14.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🎯 **Advanced Search Strategies**: Target specific ATS platforms (Greenhouse, Lever, Workable, etc.), career pages, communities, or documents
- 🔍 **Smart Query Building**: Automatically generates optimized Google search queries
- 🎨 **Modern UI/UX**: Beautiful dark/light theme with smooth animations
- ⚡ **Performance Optimized**: Built with Next.js 14 App Router for maximum speed
- 🔒 **Privacy First**: API credentials stored locally in your browser
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- ♿ **Accessible**: WCAG compliant with keyboard navigation support
- 🚀 **Production Ready**: Optimized builds, SEO friendly, security headers

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules with CSS Variables
- **Icons**: Lucide React
- **API**: Google Custom Search API

### Project Structure

```
Job-Radar/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   └── search/           # Search API endpoint
│   ├── layout.tsx            # Root layout with metadata
│   ├── page.tsx              # Main application page
│   └── globals.css           # Global styles & CSS variables
├── components/               # React components
│   ├── Sidebar/              # Sidebar components
│   │   ├── ApiConfig.tsx
│   │   ├── SearchFilters.tsx
│   │   ├── SearchStrategies.tsx
│   │   └── QueryPreview.tsx
│   ├── Results/              # Results components
│   │   ├── JobCard.tsx
│   │   ├── EmptyState.tsx
│   │   ├── LoadingState.tsx
│   │   ├── ErrorState.tsx
│   │   └── ResultsHeader.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Toast.tsx
│   └── HelpModal.tsx
├── hooks/                    # Custom React hooks
│   ├── useLocalStorage.ts    # Local storage management
│   ├── useSearch.ts          # Search state management
│   └── useToast.ts           # Toast notifications
├── lib/                      # Utilities & business logic
│   ├── types.ts              # TypeScript definitions
│   ├── strategies.ts         # Search strategies
│   └── utils.ts              # Helper functions
└── public/                   # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Google Cloud Account (for API credentials)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/Job-Radar.git
cd Job-Radar
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
npm run dev
```

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 API Setup

### 1. Google API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select an existing one
3. Enable the **Custom Search API**
4. Create an API key under "Credentials"

### 2. Search Engine ID (CX)

1. Visit [Programmable Search Engine](https://programmablesearchengine.google.com/controlpanel/all)
2. Click "Add" to create a new search engine
3. Select "Search the entire web"
4. Copy your Search Engine ID (CX)

### 3. Configure in the App

1. Enter your API Key and CX in the "API Configuration" panel
2. Click "Save Credentials"
3. Your credentials are stored locally in your browser

**Note**: Google provides 100 free searches per day. Additional searches cost $5 per 1,000 queries.

## 📖 Usage

1. **Configure API Credentials**: Enter your Google API key and Search Engine ID
2. **Set Search Filters**: Enter job keywords, exclusions, and date range
3. **Select a Strategy**: Choose from ATS X-Ray, Career Pages, Communities, or Documents
4. **Browse Results**: View job listings with direct links to applications
5. **Navigate Pages**: Use pagination to explore more results

## 🎯 Search Strategies

### ATS X-Ray
Searches directly on Applicant Tracking Systems like Greenhouse, Lever, Workable, and Ashby.

### Career Pages
Finds jobs on company career pages, excluding job boards like Indeed and LinkedIn.

### Communities
Searches job postings on Reddit (r/forhire, r/remotejobs) and Hacker News.

### Documents
Finds PDF and DOC files containing job descriptions and postings.

## 🛠️ Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

### Performance Optimization

- **Code Splitting**: Automatic route-based code splitting with Next.js
- **Image Optimization**: Built-in Next.js image optimization
- **Font Optimization**: Google Fonts with `font-display: swap`
- **CSS Optimization**: CSS Modules with tree shaking
- **API Caching**: Response caching with `stale-while-revalidate`
- **Bundle Analysis**: Use `@next/bundle-analyzer` to analyze bundle size

### Security Features

- **Security Headers**: XSS protection, frame options, content type sniffing prevention
- **HTTPS Only**: Strict-Transport-Security header
- **No API Key Exposure**: Keys stored in browser localStorage only
- **Input Sanitization**: All user inputs are sanitized
- **CORS Protection**: API routes configured for same-origin requests

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

The app can be deployed on any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render
- Self-hosted with Docker

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Jose Paulino**
- Website: [josepaulino.com](https://josepaulino.com)
- GitHub: [@josepaulinog](https://github.com/josepaulinog)

## 🙏 Acknowledgments

- Google Custom Search API for powering the search functionality
- [Lucide Icons](https://lucide.dev) for the beautiful icon set
- The Next.js team for an amazing framework

## 📊 Roadmap

- [ ] Save search history
- [ ] Export results to CSV/JSON
- [ ] Email alerts for new job postings
- [ ] Advanced filtering options
- [ ] Job application tracking
- [ ] Browser extension

## 🐛 Known Issues

- Google Custom Search API limits results to 100 total
- Some ATS platforms may block automated searches

## 💡 Tips

- Use specific job titles for better results
- Combine multiple exclusion terms with commas
- Try different strategies for comprehensive coverage
- Check the "Posted Within" filter for fresh listings

---

Built with ❤️ by [Jose Paulino](https://josepaulino.com)
