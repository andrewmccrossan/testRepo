puts "Seeding database..."

# Sample descriptions for tasks
descriptions = [
  "This task needs to be completed as part of the current sprint.",
  "Important deliverable that impacts the project timeline.",
  "Review existing implementation and make necessary improvements.",
  "Coordinate with the team to ensure proper implementation.",
  "Research best practices and apply them to our codebase.",
  "Ensure thorough testing before marking as complete.",
  "Document the process and update the wiki accordingly.",
  "This blocks other tasks and should be prioritized.",
  "Follow up on feedback from the last review session.",
  "Align with the design specs provided by the team."
]

# Create demo user
demo = User.find_or_create_by!(email: "demo@example.com") do |u|
  u.name = "Demo User"
  u.password = "password123"
end

# Create additional users
user_names = ["Alice Johnson", "Bob Smith", "Carol Davis", "Dan Wilson"]
users = user_names.each_with_index.map do |name, i|
  User.find_or_create_by!(email: "user#{i + 1}@example.com") do |u|
    u.name = name
    u.password = "password123"
  end
end

all_users = [demo] + users

# Create boards
board_data = [
  { name: "Product Launch", description: "Track all tasks for the upcoming product launch campaign." },
  { name: "Bug Fixes Q2", description: "Prioritized bug fixes for the second quarter release." },
  { name: "Website Redesign", description: "Complete overhaul of the company website with new branding." }
]

boards = board_data.map do |data|
  Board.find_or_create_by!(name: data[:name]) do |b|
    b.description = data[:description]
    b.owner = all_users.sample
  end
end

# Create tasks
statuses = %w[todo in_progress in_review done]
priorities = %w[low medium high urgent]

task_titles = [
  "Set up CI/CD pipeline", "Write API documentation", "Design landing page mockup",
  "Implement user authentication", "Fix navigation dropdown bug", "Add search functionality",
  "Create database schema", "Write unit tests for models", "Set up error monitoring",
  "Optimize image loading", "Review pull requests", "Update dependencies",
  "Configure email notifications", "Add pagination to listings", "Implement dark mode",
  "Fix mobile responsive layout", "Add export to CSV feature", "Set up staging environment",
  "Create onboarding flow", "Write integration tests", "Optimize database queries",
  "Add rate limiting", "Design email templates", "Implement file upload",
  "Fix timezone handling", "Add activity log", "Create admin dashboard",
  "Set up automated backups", "Implement webhook system", "Add two-factor authentication"
]

boards.each do |board|
  titles = task_titles.sample(rand(8..12))
  titles.each_with_index do |title, i|
    task = board.tasks.find_or_create_by!(title: title) do |t|
      t.description = descriptions.sample
      t.status = statuses.sample
      t.priority = priorities.sample
      t.position = i
      t.due_date = [nil, Date.current + rand(1..30).days].sample
    end
    task.assignees = all_users.sample(rand(1..3)) if task.assignees.empty?
  end
end

puts "Seeded: #{User.count} users, #{Board.count} boards, #{Task.count} tasks, #{Assignment.count} assignments"
puts "Demo login: demo@example.com / password123"
