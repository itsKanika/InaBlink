# InaBlink - Real-time Tech News Dashboard
Deployed link :- https://dashing-hummingbird-a066c0.netlify.app/

Demo link:- https://www.youtube.com/watch?v=rvk2OGVCL-M&ab_channel=kani

InaBlink is a modern, real-time tech news dashboard that aggregates and displays the latest technology news from various sources. Built with vanilla JavaScript and powered by the Pathway framework for real-time data processing.

![InaBlink Dashboard](https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)

## Features

- 🚀 Real-time news updates from multiple tech sources
- 🤖 AI-powered chat interface for news queries
- 📊 Trending news analysis
- 🌓 Dark/light mode support
- 📱 Fully responsive design
- ⚡ Pathway-powered data streaming
- ⚙️ Configurable data sources

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your API keys in the Settings page:
   - Pathway API key
   - OpenAI API key (for chat functionality)

4. Start the development server:
   ```bash
   npm run dev
   ```

## Data Sources

InaBlink supports multiple tech news sources:
- Hacker News
- GitHub Trending
- TechCrunch
- Reddit r/MachineLearning
- Product Hunt
- Local feeds folder

Configure your preferred sources and refresh intervals in the Settings page.

## Local Development

To test real-time updates:
1. Add `.txt` or `.json` files to the `/feeds` directory
2. The dashboard will automatically update with new content
3. Chat functionality will include the new data in responses

## Project Structure

```
inablink/
├── assets/          # Static assets
├── css/            # Stylesheets
├── js/             # JavaScript modules
├── feeds/          # Local news feed files
└── index.html      # Main application
```

## Key Features

### Real-time News Dashboard
- Interactive news cards with source attribution
- Auto-updating content via Pathway
- Smooth animations and transitions

### AI-Powered Chat
- Ask questions about tech news
- RAG-based responses using latest news data
- Natural language interaction

### Trending Analysis
- Top 5 trending tech topics
- Real-time updates
- Source-based filtering

### Pipeline Monitoring
- View data processing metrics
- Monitor active sources
- Real-time pipeline status

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project for your own purposes.

## Acknowledgments

- Built with [Pathway](https://pathway.com) for real-time data processing
- Icons by [Lucide](https://lucide.dev)
- Images from [Pexels](https://pexels.com)
