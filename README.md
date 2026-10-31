# 🎉 Gather & Co. – Conference Event Planner

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Poppins&weight=600&size=22&duration=3000&pause=1000&color=6366F1&center=true&vCenter=true&width=750&lines=Welcome+to+Gather+%26+Co.;Conference+Event+Planning+Application;Select+Venues%2C+Rooms%2C+Add-ons+and+Meals;Manage+Event+Estimates+and+Bookings;React+%7C+TypeScript+%7C+ASP.NET+Core" alt="Typing SVG" />

**Plan. Customize. Estimate. Book.**

A web-based conference event planning application that helps users organize event requirements, calculate costs, and manage bookings.

</div>

---

## 📖 About the Project

**Gather & Co.** is a Conference Event Planner application developed to simplify the process of organizing and managing conference events. It allows users to select venues and rooms, customize additional equipment and catering services, review their selected items, calculate event expenses, and submit booking information.

The application is composed of two major parts:

- **Frontend – Systems Integration and Architecture (SIA):** Responsible for the user interface, event planning experience, application state management, and communication with the backend.
- **Backend – Integrative Programming 2 (IP2):** Responsible for API operations, application logic, data validation, booking management, and database interactions.

The project demonstrates how a frontend application integrates with a backend service to process and manage conference event information.

---

## ✨ Features and Functionalities

### 🏛️ 1. Venue and Room Selection

The Venue and Room Selection feature allows users to explore and select the appropriate venue and room for their conference event.

**Functionalities:**
- Displays available venue and room options.
- Allows users to select their preferred room.
- Supports event customization based on room selection.
- Includes selected room information in the event planning process.
- Updates the selected items used for event cost computation.

**Technology used:** React, TypeScript, and Redux Toolkit for the user interface and application state management.

**Component:** `VenueRoomSelection.tsx`

### 🎤 2. Audio-Visual Add-ons Selection

The Add-ons Selection feature allows users to customize their conference requirements by selecting additional equipment and services.

**Functionalities:**
- Displays available add-on options.
- Allows users to select additional event equipment.
- Updates selections based on user interaction.
- Includes selected add-ons in the cart and event cost summary.

**Technology used:** React and TypeScript for component-based interaction, with Redux Toolkit for managing application selections.

**Component:** `AddonsSelection.tsx`

### 🍽️ 3. Meals and Catering Selection

The Meals Selection feature provides users with meal and catering options for their planned conference.

**Functionalities:**
- Displays available meal options.
- Allows users to select catering requirements.
- Updates meal selections in the event configuration.
- Includes selected meals in the cart and total cost calculation.

**Technology used:** React, TypeScript, and Redux Toolkit.

**Component:** `MealsSelection.tsx`

### 🛒 4. Cart Management

The Cart feature gathers the selected rooms, add-ons, and meals into one place so users can review their conference requirements before proceeding.

**Functionalities:**
- Displays selected event items.
- Provides an overview of the user's selections.
- Allows users to review their planned event requirements.
- Shows the corresponding item costs.
- Supports the checkout process.

**Technology used:** React, TypeScript, and Redux Toolkit for managing and displaying selected items.

**Components:** `CartDrawer.tsx` and cart-related feature components.

### 💰 5. Summary and Total Cost Calculation

The Summary Totals feature provides an overview of the estimated expenses based on the user's selected event requirements.

**Functionalities:**
- Displays the summary of selected event items.
- Computes and presents the total estimated cost.
- Updates the displayed amount when selections change.
- Helps users review their planned event expenses before checkout.

**Technology used:** React, TypeScript, and Redux Toolkit selectors for accessing application state and displaying calculated totals.

**Component:** `SummaryTotalsSection.tsx`

### 📋 6. Event Estimates Management

The Estimates feature supports the management of saved event estimates.

**Functionalities:**
- Communicates with the backend estimate-related API.
- Supports retrieving estimate information.
- Allows the application to display saved event planning information when available through the API.
- Helps users keep track of their planned event costs.

**Technology used:** React, TypeScript, API service integration, and ASP.NET Core backend endpoints.

### 🧾 7. Checkout Process

The Checkout feature provides the interface for proceeding with a conference booking after reviewing the selected event requirements.

**Functionalities:**
- Presents the checkout interface.
- Collects the booking information required by the application.
- Prepares the selected event details for submission.
- Connects the frontend checkout process to the backend booking API.

**Technology used:** React, TypeScript, Redux Toolkit, and HTTP API requests.

**Component:** `CheckoutModal.tsx`

### ✅ 8. Booking Confirmation

The Booking Confirmation feature displays booking information after the booking process has been completed successfully.

**Functionalities:**
- Displays the booking confirmation interface.
- Presents the booking reference and available booking details.
- Shows relevant event information.
- Provides users with confirmation of their booking submission.

**Technology used:** React, TypeScript, and backend API integration.

**Component:** `BookingConfirmationModal.tsx`

### 📚 9. Bookings History

The Bookings History feature provides access to previously created bookings.

**Functionalities:**
- Retrieves booking information through the backend API.
- Displays available booking records.
- Allows users to review their existing booking details.
- Helps users keep track of submitted conference bookings.

**Technology used:** React, TypeScript, ASP.NET Core API, and SQLite database.

**Component:** `BookingsHistoryDrawer.tsx`

### 🔗 10. Frontend and Backend Integration

The application connects its React frontend to the ASP.NET Core backend through HTTP requests.

**Functionalities:**
- Retrieves catalog information from the backend.
- Sends cart validation requests.
- Communicates with estimate-related endpoints.
- Submits booking information.
- Retrieves existing booking records.
- Processes backend responses and displays relevant information in the frontend.

**Technology used:** React, TypeScript, ASP.NET Core Web API, C#, Entity Framework Core, and SQLite.

**Frontend service:** `api.ts`

### 🧭 11. Navigation and Application Layout

The navigation component provides access to the application's main sections and helps users move through the event planning interface.

**Functionalities:**
- Provides the main application navigation.
- Organizes the interface for easier access to event planning features.
- Supports navigation between the application's different sections.

**Technology used:** React, TypeScript, and CSS.

**Component:** `Navbar.tsx`

---

## 📸 Screenshots and Project Evidence

The following screenshots demonstrate the actual execution of the backend, API requests, booking operations, and frontend-backend integration.

### SS 1 – Backend Application Running

This screenshot shows the ASP.NET Core backend application running through the terminal. It provides evidence that the backend server has started and is ready to receive API requests.

![Backend Running](screenshot/SS%201.png)

### SS 2 – Catalog API Successful Response

This screenshot shows the Catalog API being tested through Scalar. The successful response demonstrates that the backend can retrieve and return catalog information in JSON format.

![Catalog API](screenshot/SS%202.png)

### SS 3 – Booking API Successfully Created

This screenshot shows a booking creation request submitted through Scalar. The `201 Created` HTTP response indicates that the backend successfully processed the booking creation request.

![Booking API](screenshot/SS%203.png)

### SS 4 – Frontend Booking Confirmation

This screenshot shows the Gather & Co. frontend displaying the booking confirmation. It demonstrates how booking details are presented to the user after the booking process.

![Booking Confirmation](screenshot/SS%204.png)

### SS 5 – Backend and Frontend Booking Results

This screenshot presents the backend booking response alongside the frontend booking confirmation. It allows the booking information returned by the backend to be compared with the information displayed in the frontend.

![Backend and Frontend Booking](screenshot/SS%205.png)

### SS 6 – Frontend and Backend Network Integration

This screenshot shows the application running in the browser with the Developer Tools Network tab open. Requests such as `catalog`, `estimates`, and `bookings` show successful HTTP `200` responses, providing evidence of communication between the frontend and backend.

![Network Integration](screenshot/SS%206.png)

---

## 🛠️ Technologies Used

### Frontend Development

| Technology | Purpose |
|---|---|
| React | Builds the user interface using reusable components. |
| TypeScript | Adds static typing to JavaScript code. |
| Vite | Provides the frontend development server and build process. |
| Redux Toolkit | Manages shared application state and user selections. |
| CSS | Handles application layout, styling, and visual presentation. |
| Lucide React | Provides icons used throughout the application. |

### Backend Development

| Technology | Purpose |
|---|---|
| C# | Programming language used for backend implementation. |
| ASP.NET Core | Framework for building HTTP APIs. |
| .NET 10 | Backend development platform. |
| Entity Framework Core | Handles database access and data persistence. |
| SQLite | Relational database used for application data. |
| FluentValidation | Provides request and input validation. |
| Scalar | Provides interactive API documentation and endpoint testing. |
| xUnit | Supports automated backend testing. |

---

## 🏗️ Application Architecture

The project separates the frontend and backend responsibilities.

### Frontend

The frontend is built using React and TypeScript. It handles the user interface, event selection, cart management, cost summaries, checkout, and presentation of booking information.

Redux Toolkit is used to manage shared application state, while the API service handles communication with the backend.

### Backend

The backend is developed using ASP.NET Core and follows a Vertical Slice Architecture approach.

Its responsibilities include handling API requests, executing application operations, validating data, managing bookings, and interacting with the SQLite database through Entity Framework Core.

### Database

SQLite is used as the application's relational database. Entity Framework Core provides the data access layer for storing and retrieving application information.

---

## 📂 Project Structure

```text
FinalProject-Edma/
│
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Navbar.tsx
│       │   ├── SummaryTotalsSection.tsx
│       │   ├── CartDrawer.tsx
│       │   ├── CheckoutModal.tsx
│       │   ├── BookingConfirmationModal.tsx
│       │   └── BookingsHistoryDrawer.tsx
│       │
│       ├── features/
│       │   ├── addons/
│       │   ├── meals/
│       │   ├── rooms/
│       │   └── cart/
│       │
│       ├── pages/
│       ├── services/
│       ├── store/
│       ├── styles/
│       └── types/
│
├── backend/
│   ├── Api/
│   │   └── Features/
│   ├── Application/
│   │   ├── Abstractions/
│   │   └── Features/
│   ├── Domain/
│   │   └── Entities/
│   ├── Infrastructure/
│   │   └── Persistence/
│   └── Tests/
│
├── screenshots/
│   ├── SS 1.png
│   ├── SS 2.png
│   ├── SS 3.png
│   ├── SS 4.png
│   ├── SS 5.png
│   └── SS 6.png
│
└── README.md
```

---

## 🚀 Installation and Setup

### Prerequisites

Make sure the following tools are installed:

- Node.js and npm
- .NET 10 SDK
- Git
- Visual Studio Code or another compatible code editor

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd FinalProject-Edma
```

### 2. Run the Backend

Open a terminal and navigate to the backend folder:

```powershell
cd backend
```

Restore dependencies:

```powershell
dotnet restore .\Api\Api.csproj
```

Build the backend:

```powershell
dotnet build .\Api\Api.csproj
```

Run the backend API:

```powershell
dotnet run --project .\Api\Api.csproj
```

Keep this terminal running.

### 3. Run the Frontend

Open another terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

```text
http://localhost:5173
```

---

## 🔌 Backend API Endpoints

The following endpoints are part of the API functionality demonstrated in the project.

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/api/catalog` | Retrieves available catalog information. |
| POST | `/api/cart/validate` | Validates cart selections and processes cost calculations. |
| POST | `/api/bookings` | Creates a new conference booking. |
| GET | `/api/bookings` | Retrieves saved booking records. |

Additional estimate-related API requests are also shown in the frontend Network tab. Refer to the actual Scalar documentation for the complete endpoint list.

---

## 🧪 Testing and Verification

The application can be tested by following these steps:

1. Start the ASP.NET Core backend.
2. Start the React frontend.
3. Open the application in a browser.
4. Test venue, room, add-on, and meal selections.
5. Review the cart and estimated total.
6. Proceed through the checkout process.
7. Submit a booking.
8. Check the booking confirmation.
9. Inspect the Network tab in Developer Tools.
10. Verify the HTTP status codes returned by the backend.

Successful API responses and booking operations provide evidence that the frontend and backend are communicating.

---

## 🎓 Academic Project Information

| Information | Details |
|---|---|
| Project Name | Gather & Co. – Conference Event Planner |
| Repository | FinalProject-Edma |
| Frontend Subject | Systems Integration and Architecture (SIA) |
| Backend Subject | Integrative Programming 2 (IP2) |
| Frontend Framework | React with TypeScript |
| Backend Framework | ASP.NET Core |
| Database | SQLite |

---

<div align="center">

**Conference Event Planner**

*Making conference event planning easier through an integrated frontend and backend application.*

**Developed by:** Gineva D. Edma

**Course:** BS Information Technology 
**Section:** BSIT 3D

</div>
