# Gather & Co. — Conference Event Planner Web Application

> **Production-Quality Full-Stack Conference Planning System**  
> Developed for Academic Final Project Submission by **edmagineva3d** (`edmagineva11@gmail.com`).  
> Frontend: **React 18 + TypeScript + Vite + Redux Toolkit**  
> Backend: **.NET 10 Web API + Vertical Slice Architecture + EF Core SQLite**  

---

## 1. Project Overview

**Gather & Co. Conference Event Planner** is a modern, responsive, full-stack web application designed to streamline conference budget estimation and venue booking. The system provides seamless synchronization between a playful, pastel retro user interface and an authoritative Vertical Slice backend engine.

### Key Highlights
- **Playful, Artisanal Visual Design**: Faithful recreation of the reference website design featuring warm butter cream backgrounds, scalloped marquee ribbons, checkered pink and cobalt borders, tactile squishy cards, and rounded retro typography.
- **Dynamic Calculation Engine**: Subtotals for Venue Rooms, AV Equipment, and Catering Meals compute live without hardcoding.
- **Authoritative Server-Side Validation**: Backend recalculates and validates estimates to ensure accurate totals.
- **Persistent Database Storage**: Complete SQLite persistence using Entity Framework Core, storing events and customized expense estimates.
- **Four-Column Itemized Expense Table**: "Show Details" modal showcasing item descriptions, unit rates, quantities, and individual subtotals.
- **Saved Estimates Drawer**: Direct retrieval and history viewing of quotes stored in the database.

---

## 2. Main Features

### A. Landing Page & Brand Experience
- Brand narrative introducing **Gather & Co.** and the philosophy of joyful, seamless event planning.
- High-impact hero section with rounded collage styling, seasonal badges, and responsive action buttons.
- Continuous undulating marquee banner with floral star accents (`✦`).
- Visual overview cards leading into the planning workflow.

### B. Venue Room Selection (5 Official Rooms)
Users select the exact quantity of conference spaces needed:
| Room Type | Capacity | Unit Price |
| :--- | :---: | :---: |
| **Auditorium Hall** | 200 | $5,500 |
| **Conference Room** | 15 | $3,500 |
| **Presentation Room** | 50 | $700 |
| **Large Meeting Room** | 10 | $900 |
| **Small Meeting Room** | 5 | $1,100 |
- Increment (`+`) and decrement (`-`) quantity controls with zero-floor enforcement.
- Automatic individual room subtotal calculation.
- Live Room Selection Total bar.

### C. AV Equipment Add-ons Selection (5 Official Items)
| Equipment Type | Category | Unit Price |
| :--- | :---: | :---: |
| **Speakers** | Audio | $35 |
| **Microphones** | Audio | $45 |
| **Whiteboards** | Interactive | $80 |
| **Projectors** | Visual | $200 |
| **Signage** | Directional | $80 |
- Live subtotal indicators for each equipment item.
- Live Add-ons Selection Total bar.

### D. Catering Meals Selection (4 Official Options)
| Meal Course | Price per Person |
| :--- | :---: |
| **Breakfast** | $50 |
| **Lunch** | $60 |
| **High Tea** | $25 |
| **Dinner** | $70 |
- Global attendee count synchronizer.
- Individual checkboxes to include or exclude courses.
- Per-meal participant count input with negative prevention.
- Automatic meals subtotal and live Meals Selection Total bar.

### E. Automatic Cost Overview & Grand Total
- Dynamically derives:
  $$\text{Grand Total} = \text{Rooms Total} + \text{Add-ons Total} + \text{Meals Total}$$
- Real-time updates without page reloads.
- Standard currency formatting (`$X,XXX`).

### F. Show Details Popup Modal
- Triggered from the navigation bar.
- Displays a structured 4-column summary table:
  - **Selection Type**
  - **Unit Cost**
  - **Quantity**
  - **Subtotal**
- Clear identification and filtering of unselected zero-quantity items.
- Organizer & Event title customization fields.
- **Save Estimate to DB** button persisting quotes to the backend SQLite database.
- **Reset Selections** button to restart planning.

---

## 3. Technology Stack

### Frontend
- **Framework**: React 18
- **Language**: TypeScript (Strict typing, no loose JavaScript)
- **Build Tool**: Vite 8
- **State Management**: Redux Toolkit (Typed hooks `useAppDispatch`, `useAppSelector`)
- **Icons**: Lucide React + Custom handcrafted squishy SVG assets
- **Styling**: Modern CSS3 (CSS Variables, Flexbox, CSS Grid, Keyframe Animations)
- **Typography**: Fredoka, Comfortaa, Quicksand (Google Fonts)

### Backend
- **Framework**: .NET 10 Web API
- **Architecture**: Vertical Slice Architecture (CQRS with Commands, Queries, Handlers, Validators)
- **ORM / Persistence**: Entity Framework Core 10 with SQLite provider
- **Validation**: FluentValidation 11
- **API Documentation**: Microsoft OpenAPI + Scalar Interactive Reference (`/scalar/v1`)
- **Testing**: xUnit with InMemory EF Core provider

---

## 4. Architecture & Directory Structure

```
FinalProject-Edma/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/                 # Typed Redux store and hooks
│   │   │   ├── hooks.ts
│   │   │   └── store.ts
│   │   ├── components/          # Reusable UI presentation components
│   │   │   ├── DecorativeAssets.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── QuantityControl.tsx
│   │   │   ├── SavedQuotesDrawer.tsx
│   │   │   ├── ShowDetailsModal.tsx
│   │   │   └── SummaryTotalsSection.tsx
│   │   ├── features/            # Feature slices and thunks
│   │   │   ├── addons/          # Add-ons state slice and UI
│   │   │   ├── estimates/       # Estimates modal and persistence slice
│   │   │   ├── meals/           # Meals state slice and UI
│   │   │   ├── rooms/           # Rooms state slice and UI
│   │   │   └── thunks.ts        # Async action dispatchers
│   │   ├── pages/               # Page layouts
│   │   │   └── PlannerPage.tsx
│   │   ├── services/            # API client layer
│   │   │   └── api.ts
│   │   ├── store/               # Redux store configuration and selectors
│   │   │   ├── index.ts
│   │   │   └── selectors.ts
│   │   ├── styles/              # Design system tokens and styles
│   │   │   ├── animations.css
│   │   │   ├── components.css
│   │   │   ├── index.css
│   │   │   ├── responsive.css
│   │   │   ├── typography.css
│   │   │   └── variables.css
│   │   ├── types/               # TypeScript domain interfaces
│   │   │   └── index.ts
│   │   ├── utils/               # Calculation verification helpers
│   │   │   └── calculations.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── backend/
│   ├── Api/                     # Minimal API Endpoints and Hosting
│   │   ├── Common/Extensions/   # Result to ProblemDetails extensions
│   │   ├── Features/            # Endpoint route mappings by feature
│   │   │   ├── AddOns/
│   │   │   ├── Estimates/
│   │   │   ├── Events/
│   │   │   ├── Meals/
│   │   │   └── Rooms/
│   │   ├── Properties/launchSettings.json
│   │   ├── appsettings.json
│   │   ├── appsettings.Development.json
│   │   └── Program.cs           # DI registration, CORS, OpenAPI, Seeding
│   ├── Application/             # Vertical Slices: CQRS & FluentValidation
│   │   ├── Abstractions/        # Data and Messaging interfaces
│   │   └── Features/
│   │       ├── AddOns/          # GetAllAddOns, GetAddOnByCode
│   │       ├── Estimates/       # CalculateEstimate, CreateEstimate, GetAll, GetById
│   │       ├── Events/          # Create, GetAll, GetById, Update, Delete
│   │       ├── Meals/           # GetAllMeals, GetMealByCode
│   │       └── Rooms/           # GetAllRooms, GetRoomByCode
│   ├── Domain/                  # Core entities and Result pattern
│   │   ├── Common/              # BaseEntity, Result<T>, Error
│   │   └── Entities/            # ConferenceEvent, RoomOption, AddOnOption, MealOption, ExpenseEstimate, EstimateItem
│   ├── Infrastructure/          # EF Core SQLite AppDbContext
│   │   └── Persistence/
│   ├── Tests/                   # Automated xUnit test suite
│   │   ├── CatalogTests.cs
│   │   ├── EstimateCalculationTests.cs
│   │   ├── EstimatePersistenceTests.cs
│   │   ├── TestDbContextFactory.cs
│   │   └── ValidatorTests.cs
│   ├── VerticalSlice.sln
│   └── VerticalSlice.slnx
├── run-backend.bat              # Quick launch script for Backend
├── run-frontend.bat             # Quick launch script for Frontend
├── README.md
└── .gitignore
```

---

## 5. Local Setup and Execution

### Prerequisites
- **.NET 10 SDK** (verified with `dotnet --version`)
- **Node.js (v18+)** and **npm** (verified with `node -v` and `npm.cmd -v`)

---

### Starting the Backend (.NET 10 API)

1. Open a terminal and navigate to the backend API project:
   ```bash
   cd backend/Api
   dotnet run --launch-profile http
   ```
2. The backend server will initialize:
   - **Base URL**: `http://localhost:5000`
   - **Interactive API Documentation (Scalar)**: `http://localhost:5000/scalar/v1`
   - **OpenAPI Schema**: `http://localhost:5000/openapi/v1.json`
   - **Catalog API**: `http://localhost:5000/api/catalog`
   - **SQLite Database**: Automatically created and seeded as `conference_planner.db`.

*(Alternatively, double-click `run-backend.bat` in Windows Explorer).*

---

### Starting the Frontend (React + Vite)

1. Open a separate terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   npm.cmd install
   npm.cmd run dev
   ```
2. Open your browser and navigate to:
   - **Frontend URL**: `http://localhost:5173`

*(Alternatively, double-click `run-frontend.bat` in Windows Explorer).*

---

## 6. API Endpoints Reference

| HTTP Method | Route | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API Health and info endpoint |
| `GET` | `/api/catalog` | Consolidated catalog (Rooms, Add-ons, Meals) |
| `GET` | `/api/rooms` | Retrieve all 5 venue room options |
| `GET` | `/api/rooms/{code}` | Retrieve room by code (e.g. `auditorium-hall`) |
| `GET` | `/api/addons` | Retrieve all 5 AV equipment options |
| `GET` | `/api/addons/{code}` | Retrieve add-on by code (e.g. `projectors`) |
| `GET` | `/api/meals` | Retrieve all 4 catering meal options |
| `GET` | `/api/meals/{code}` | Retrieve meal by code (e.g. `breakfast`) |
| `GET` | `/api/events` | List all conference events |
| `GET` | `/api/events/{id}` | Retrieve conference event by ID |
| `POST` | `/api/events` | Create a new conference event |
| `PUT` | `/api/events/{id}` | Update an existing event |
| `DELETE` | `/api/events/{id}` | Delete a conference event |
| `POST` | `/api/estimates/calculate` | Compute authoritative estimate without saving |
| `POST` | `/api/estimates` | Save customized estimate to SQLite database |
| `GET` | `/api/estimates` | List all saved estimates from database |
| `GET` | `/api/estimates/{id}` | Retrieve saved estimate by ID |

---

## 7. Automated Testing & Verification

### Running Backend Tests
Execute the xUnit automated test suite:
```bash
dotnet test backend/Tests/Tests.csproj
```
**Test Coverage Includes:**
- `CatalogTests`: Validates pricing, capacities, and display orders for all 5 rooms, 5 equipment items, and 4 meals.
- `EstimateCalculationTests`: Validates exact arithmetic match for PDF examples, live subtotal computation, and exclusion of zero quantities.
- `EstimatePersistenceTests`: Tests saving quotes to the database and re-reading them through the query handlers.
- `ValidatorTests`: Verifies FluentValidation rules for attendee bounds, date constraints, and non-negative counts.

### Building Frontend for Production
Verify TypeScript compilation and asset bundling:
```bash
cd frontend
npm.cmd run build
```
Build output is generated cleanly into `dist/` with zero TypeScript errors.

---

## 8. Git Commit Log (Exactly 23 Commits)

This repository follows a strictly curated 23-commit history under the identity:
- **Username**: `edmagineva3d`
- **Email**: `edmagineva11@gmail.com`

```text
1.  chore: initialize repository and workspace structure for FinalProject-Edma
2.  feat(backend): setup Vertical Slice solution structure and base architecture
3.  feat(backend): implement domain entities for conference planner and catalog
4.  feat(backend): configure EF Core SQLite persistence and database context
5.  feat(backend): implement Rooms feature with queries and minimal API endpoints
6.  feat(backend): implement AddOns feature with queries and minimal API endpoints
7.  feat(backend): implement Meals feature with queries and minimal API endpoints
8.  feat(backend): implement Events feature with CRUD commands, queries, and validation
9.  feat(backend): implement Estimates calculation, validation, and persistence features
10. test(backend): add automated unit and integration tests for catalog, calculations, and estimates
11. feat(backend): configure CORS, seed catalog data, and enable OpenAPI Scalar documentation
12. chore(frontend): initialize React TypeScript Vite application and install dependencies
13. style(frontend): define pastel retro design system, theme tokens, and typography
14. feat(frontend): configure Redux Toolkit store, typed hooks, and domain slices
15. feat(frontend): implement API service layer for backend communication with error handling
16. feat(frontend): create responsive landing page with brand hero, features, and CTA
17. feat(frontend): implement venue room selection component with dynamic subtotal pricing
18. feat(frontend): implement add-ons equipment selection component with quantity controls
19. feat(frontend): implement meals catering selection component with guest count validation
20. feat(frontend): implement Show Details four-column expense summary modal and estimate persistence
21. feat(frontend): implement saved estimates history viewer and seamless backend integration
22. test(frontend): verify responsive layouts, validation states, and end-to-end user workflows
23. docs: add comprehensive README documentation, run scripts, and final project packaging
```

---

## 9. Deliverable Verification Checklist

- [x] **Frontend Design Excellence**: Recreated aesthetic of the reference image with pastel hues, scalloped borders, checkered ribbons, and squishy tactile controls.
- [x] **Complete Functionality**: Increment/decrement controls, real-time math, dynamic Redux state, modal popups, and database persistence are fully operational.
- [x] **Clean Vertical Slice Backend**: Removed all unrelated Student Management code and implemented clean Conference Planner feature slices.
- [x] **Persistence Verified**: Estimates persist to SQLite (`conference_planner.db`) and are viewable in the Saved Quotes drawer.
- [x] **Automated Tests**: 100% pass rate on backend unit and calculation tests.
- [x] **Git Identity & Commit Count**: Configured with `edmagineva3d` and exactly 23 commits.
- [x] **ZIP Deliverable**: Packaged as `FinalProject-Edma.zip`.

