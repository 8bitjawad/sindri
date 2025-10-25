# Sindri - Local Service Booking Platform

A Django-based platform connecting people with nearby carpenters, plumbers, electricians, and other skilled professionals in just a few clicks.

---

## The Problem

If you live in the UAE, you've probably faced this:

Getting in touch with a reliable carpenter or plumber isn't as easy as it should be. Unless you live in a building that already provides maintenance (often at higher rent and less flexibility), you're left relying on random WhatsApp numbers, word-of-mouth recommendations, or expensive agencies.  
There's no simple, trustworthy system for finding, booking, and reviewing local service providers — especially for small, one-time jobs.

---

## The Solution

Sindri aims to make this process simple and transparent:

- **Customers** can browse local services, book a provider, track booking status, and leave reviews — all from one dashboard.  
- **Service Providers** can list their services, manage bookings, and view performance analytics.  
- A **Django-powered backend** ensures smooth authentication, booking management, and secure data handling.

---

## Core Features

- Role-based authentication (Customers and Providers)  
- Service listing and management  
- Booking system with status workflow (Pending → Confirmed → In Progress → Completed)  
- Review and rating system  
- Separate dashboards for customers and providers  
- Responsive UI built with Tailwind CSS

---

## Tech Stack

- **Backend:** Django 5.x  
- **Frontend:** Django Templates, Tailwind CSS, JavaScript  
- **Database:** PostgreSQL  
- **Deployment:** Railway / Render

---

## Future Enhancements

- Email and in-app notifications  
- Location-based service filtering  
- Provider availability calendar  
- Provider analytics dashboard  
- AI-powered service recommendations

---

## Why "Sindri"?

In Norse mythology, Sindri is the dwarf who forged powerful artifacts for the gods — symbolizing craftsmanship, reliability, and skill.  
This project embodies that same spirit: empowering local professionals and making their expertise more accessible.

---

## Installation (for Developers)

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/sindri.git
cd sindri
Create and activate a virtual environment

bash
Copy code
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
Install dependencies

bash
Copy code
pip install -r requirements.txt
Run migrations

bash
Copy code
python manage.py migrate
Start the development server

bash
Copy code
python manage.py runserver
Then open your browser and visit http://127.0.0.1:8000 to explore Sindri!
