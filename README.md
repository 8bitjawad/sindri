SindriA Django-based platform connecting people with local service professionalsSindri is a modern web application that bridges the gap between customers and skilled service providers like carpenters, plumbers, electricians, and other professionals — making it as easy to book a local tradesperson as it is to order a ride.The ProblemFinding reliable local service providers in the UAE is unnecessarily difficult. Unless you live in a building with built-in maintenance services (which typically means higher rent and less flexibility), you're left with:
Random WhatsApp numbers passed around
Word-of-mouth recommendations that may or may not be current
Expensive agency services for simple jobs
No way to verify quality or read reviews from previous customers
There's a clear gap in the market for a simple, trustworthy system to find, book, and review local service providers — especially for small, one-time jobs.The SolutionSindri streamlines the entire process with a transparent, user-friendly platform:For Customers:

Browse local services and providers
Book appointments with a few clicks
Track booking status in real-time
Leave reviews and ratings based on experience
Manage everything from a personal dashboard
For Service Providers:

List and manage services
Accept and manage bookings
View performance analytics
Build reputation through customer reviews
Built on Django:

Secure authentication and authorization
Robust booking management system
Clean, maintainable codebase
Core FeaturesAuthentication & User Management

Role-based access control (Customers and Providers)
Secure user registration and login
Profile management for both user types
Service Management

Service listing and categorization
Detailed service descriptions and pricing
Provider profiles with ratings and reviews
Booking System

Complete booking workflow: Pending → Confirmed → In Progress → Completed
Real-time status updates
Booking history and tracking
Review System

Star ratings (1-5)
Written reviews
Provider reputation tracking
Dashboard

Separate interfaces for customers and providers
Intuitive, responsive design
Clean UI built with Tailwind CSS
Tech StackLayerTechnologyBackendDjango 5.xFrontendDjango Templates, Tailwind CSS, JavaScriptDatabasePostgreSQLDeploymentRailway / RenderGetting StartedPrerequisites

Python 3.10 or higher
PostgreSQL
Git
Installation
Clone the repository

bash   git clone https://github.com/yourusername/sindri.git
   cd sindri
Create and activate a virtual environment

bash   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
Install dependencies

bash   pip install -r requirements.txt
Set up environment variables

bash   cp .env.example .env
   # Edit .env with your database credentials and secret key
Run database migrations

bash   python manage.py migrate
Create a superuser (optional)

bash   python manage.py createsuperuser
Start the development server

bash   python manage.py runserver
Open your browser
Navigate to http://127.0.0.1:8000 to explore Sindri.
