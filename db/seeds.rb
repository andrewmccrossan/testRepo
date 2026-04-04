require "faker"

puts "Seeding database..."

# Create demo user
demo = User.find_or_create_by!(email: "demo@example.com") do |u|
  u.name = "Demo User"
  u.password = "password123"
end

# Create additional users
users = 4.times.map do |i|
  User.find_or_create_by!(email: "user#{i + 1}@example.com") do |u|
    u.name = Faker::Name.name
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
      t.description = Faker::Lorem.paragraph(sentence_count: rand(1..3))
      t.status = statuses.sample
      t.priority = priorities.sample
      t.position = i
      t.due_date = [nil, Date.current + rand(-5..30).days].sample
    end
    task.assignees = all_users.sample(rand(1..3)) if task.assignees.empty?
  end
end

puts "Seeded: #{User.count} users, #{Board.count} boards, #{Task.count} tasks, #{Assignment.count} assignments"
puts "Demo login: demo@example.com / password123"
