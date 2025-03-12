## Duplicate Invoices Checker

The application identifies duplicate invoices within the Accounts Payable process by grouping suspected duplicates based on various patterns. Users can review these potential duplicates with the assistance of a machine learning-based confidence score, provide feedback, and take appropriate action to prevent unnecessary payments and streamline invoice processing.

## V1.5A stable version

- **Introduce ✨SOFIA Agent✨**: A concept to integrate LLM model to help on demand. 
- **Duplicate Detection**: Uses specific algorithms to identify duplicate invoices based on defined criteria.
- **User-Friendly Interface**: Provides an intuitive UI for users to view and manage detected duplicates.

## Technologies Used
* **React**: For building the user interface.
* **TypeScript**: For static typing.
* **Vite**: For fast development server and build tool.
* **Tailwind CSS**: For styling the application.

## Project structure 
```
duplicate-invoices-app/
├── public/                         # Static assets
├── src/                            # Source code
│   ├── components/                 # Global components
│   │   ├── ui/                     # Schadcn components
│   ├── assets/                     # Images and other assets
│   │   ├── modules/                # Specific Context components
│   │   │    ├── dashboard/ 
│   │   │    │    ├── components/   
│   │   │    │    ├── layout/       
│   │   │    │    ├── pages/
│   │   │    │    ├── services/
│   │   │    │    ├── utils/
│   │   │    │    ├── router.tsx    # Exports dashboard routes
│   │   │    ├── core/
│   │   │    │    ├── components/
│   │   │    │    ├── layout/
│   │   │    │    ├── pages/
│   │   │    │    ├── services/
│   │   │    │    ├── utils/
│   │   │    │    ├── router.tsx    # Exports core routes
│   │   │    ├── sofia/
│   │   │    │    ├── components/
│   │   │    │    ├── services/
│   │   │    │    ├── utils/
│   │   │    │    ├── router.tsx    # Exports core routes
│   ├── App.tsx                     # Main App component
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Project root vars styles
│   └── App.css                     # Main styles
├── index.html                      # Project metadata and dependencies
├── package.json                    # Project metadata and dependencies
├── tsconfig.json                   # TypeScript configuration
├── tailwind.config                 # Tailwind configuration
├── components.json                 # Schadcn configuration
├── vite.config.ts                  # Vite configuration
└── README.md                       # Project documentation

```
## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/DanielBecerraOFS/duplicate-invoices.git
   cd duplicate-invoices
   ```` 

2. **Install Dependencies**:

   Using npm:
   ```bash
   npm install
   ```` 
   Or using yarn:
   ```bash
   yarn install
   ```` 
3. **Running the Application**: 
   Using npm:
   ```bash
   npm run dev
   ```` 
   Or using yarn:
   ```bash
   yarn dev
   ```` 

The application will be accessible at http://localhost:5173.