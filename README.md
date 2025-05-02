<h4>🌱 GreenRoutine</h4>

GreenRoutine is a full-stack web application built as a capstone project for the LaunchCode Web Development Program. The app empowers users to reduce their environmental impact through daily habit-based challenges and community interaction.

<h3>🚀 Overview</h3>

GreenRoutine encourages users to adopt sustainable habits by delivering a new environmental challenge each day. Users can complete challenges, earn points ("Leaves"), and compete on a global leaderboard. With a strong social component, users can also create and share custom challenges with friends to promote collective action and engagement.

<h3>🛠 Tech Stack</h3>

<strong>Frontend:</strong> React (JavaScript)

<strong>Backend:</strong> ASP.NET Core Web API (C#)

<strong>Database:</strong> Entity Framework Core with SQL Server

<strong>External API Integration:</strong> Carbon Interface API

<h3>🌍 Features</h3>

✅ <strong>Daily Challenges:</strong> Automatically assigned daily tasks focused on sustainable living (e.g., bike to work, reduce water usage)

✅ <strong>Honor-Based Scoring:</strong> Earn "Leaves" based on challenge difficulty when marked as complete

✅ <strong>Global Leaderboard:</strong> See how your efforts stack up against others worldwide

✅ <strong>Friend System:</strong> Add friends, view their progress, and share your own custom challenges

✅ <strong>Custom Challenges:</strong> Design unique challenges and send them directly to friends

✅ <strong>Authentication:</strong> Secure user login and registration

✅ <strong>Customizable Profile:</strong> Upload a profile picture and personalize your page

✅ <strong>Carbon Footprint Calculator:</strong> Understand the real-world impact of your actions using the Carbon Interface API

<h3>📦 Getting Started</h3>

To run the app locally:

<ol>
  <li>Clone the repository</li>
  <li>
    Frontend Setup:
      cd client
      npm install
      npm start
  </li>
  <li>Backend Setup:
    <ul>
      <li>Set up your SQL Server database.</li>
      <li>Configure <i>appsettings.json</i> with your connection string.</li>
      <li>Run migrations: <i>dotnet ef database update</i></li>
      <li>Start the API: <i>dotnet run</i></li>
    </ul>
  </li>
</ol>

<h3>📫 Contact</h3>

For questions or feedback, feel free to reach out or open an issue!
