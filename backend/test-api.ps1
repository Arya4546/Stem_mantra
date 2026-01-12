# Test API Script
$baseUrl = "http://localhost:5000/api/v1"
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbWozM3BveTEwMDAwMTQ3YjBhajRiMWpnIiwiZW1haWwiOiJhZG1pbkBzdGVtbWFudHJhLmNvbSIsInJvbGUiOiJTVVBFUl9BRE1JTiIsInNjaG9vbElkIjpudWxsLCJpYXQiOjE3NjU3MzAwMzUsImV4cCI6MTc2NjMzNDgzNX0.E6pCRYHX-N8MrFPLjGQIgGEjT_91qsJDWKp0YbgK4uk"

Write-Host "Testing API Endpoints..." -ForegroundColor Cyan

# Test 1: Health Check
Write-Host "`n1. Health Check:" -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "$baseUrl/health" -Method GET -TimeoutSec 5
    Write-Host "   Status: $($health.success)" -ForegroundColor Green
} catch {
    Write-Host "   FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Blog Authors
Write-Host "`n2. Blog Authors:" -ForegroundColor Yellow
try {
    $authors = Invoke-RestMethod -Uri "$baseUrl/blog/authors" -Method GET -TimeoutSec 5
    Write-Host "   Count: $($authors.data.Count)" -ForegroundColor Green
} catch {
    Write-Host "   FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Blog Posts
Write-Host "`n3. Blog Posts:" -ForegroundColor Yellow
try {
    $posts = Invoke-RestMethod -Uri "$baseUrl/blog/posts" -Method GET -TimeoutSec 5
    Write-Host "   Count: $($posts.data.Count)" -ForegroundColor Green
} catch {
    Write-Host "   FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Create Blog Author
Write-Host "`n4. Create Blog Author:" -ForegroundColor Yellow
try {
    $headers = @{
        Authorization = "Bearer $token"
        "Content-Type" = "application/json"
    }
    $body = '{"name":"Test Author","slug":"test-author","email":"author@test.com","bio":"Test author bio"}'
    $newAuthor = Invoke-RestMethod -Uri "$baseUrl/blog/authors" -Method POST -Headers $headers -Body $body -TimeoutSec 5
    Write-Host "   Created: $($newAuthor.data.name)" -ForegroundColor Green
} catch {
    Write-Host "   FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nTests complete!" -ForegroundColor Cyan
