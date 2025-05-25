git checkout main
echo "Checked out to main"
git pull origin dev
echo "Pulled from dev"
git push origin main
echo "Main branch synced"
git checkout dev
echo "Return to Dev"