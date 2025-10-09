git checkout main
echo "Checked out to main"
git pull origin dev --no-edit
echo "Pulled from dev"
git pull origin main --no-edit
echo "Pulled from main"
git push origin main
echo "Main branch synced"
git checkout dev
echo "Return to Dev"