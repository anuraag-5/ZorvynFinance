# Zorvyn Finance App
## Tech Stack
- Next.js (App Router)
- TypeScript
- Shadcn/ui + Tailwind CSS
- LocalStorage

---

### Features
- Shows Finance summary cards in modern/beautiiful way.
- Integrated Visualizations for smooth understanding of spending patterns.
- Shows Categorical Spending breakdown to help understand users where they spend more of thier income.
- Displays list of transactions done until today.
- Includes simple filtering, sorting and search.
- Allows Admins to create, edit, and delete transactions.
- Shows Insights for monthly comparison.
- Dark Mode implemented for good UI/UX.

---

### Approach
- Stores user's sign in credentials and dummy initial transactions and income data to Local Storage.
- Used Local Storage for Data Persistancy to Focus on Frontend part.
- Used Zustand to have context of user's financial details throughout the app.
- Ensured on every transaction/change user makes, data is synced across Localstorage and Zustand.
- Implemented Logic for charts and created beautiful charts / visualizatiton through Recharts library.
- Used Motion for smooth animations across app increasing visual appeal.

---

## Live Deployed Version

👉 **https://zorvynfinance.vercel.app**

> The Deployed version will show complete end to end UI/UX.

## Running Locally
- Clone the repo
- Install Dependencies `npm i`
- `npm run dev`
- Interact with the website at localhost:3000



