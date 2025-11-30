# Git Workflow Cheat Sheet

## 🎯 Daily Commands

```bash
# Start your day
git checkout develop
git pull origin develop
git checkout -b feature/my-feature

# Work
git add .
git commit -m "feat: my changes"

# Push and PR
git push origin feature/my-feature
# Create PR on GitHub to develop

# After merge
git checkout develop
git pull origin develop
git branch -d feature/my-feature
```

## 📝 Commit Prefixes

| Prefix | Use Case | Example |
|--------|----------|---------|
| `feat:` | New feature | `feat: add user login` |
| `fix:` | Bug fix | `fix: resolve crash on startup` |
| `refactor:` | Code improvement | `refactor: optimize database queries` |
| `style:` | UI/styling | `style: update button colors` |
| `docs:` | Documentation | `docs: update README` |
| `test:` | Tests | `test: add login tests` |
| `chore:` | Maintenance | `chore: update dependencies` |

## 🌿 Branch Naming

| Type | Format | Example |
|------|--------|---------|
| Feature | `feature/description` | `feature/add-payment` |
| Bug | `bugfix/description` or `fix/description` | `bugfix/login-error` |
| Hotfix | `hotfix/description` | `hotfix/critical-bug` |
| Refactor | `refactor/description` | `refactor/api-calls` |
| Style | `style/description` | `style/navbar-design` |
| Docs | `docs/description` | `docs/api-guide` |

## ⚡ Quick Fixes

### Update branch with develop
```bash
git fetch origin
git merge origin/develop
```

### Undo last commit (not pushed)
```bash
git reset --soft HEAD~1
```

### Fix wrong branch name
```bash
git branch -m old-name new-name
git push origin -u new-name
git push origin --delete old-name
```

### Stash changes temporarily
```bash
git stash
git checkout develop
git pull
git checkout feature/my-feature
git stash pop
```

## 🚫 Never Do This

❌ `git push origin main` (direct push)  
❌ `git push origin develop` (direct push)  
❌ PR from `feature/*` to `main`  
❌ `git push --force` on protected branches

## ✅ Always Do This

✅ Create feature branch from `develop`  
✅ PR to `develop` (not `main`)  
✅ Get code review before merge  
✅ Delete branch after merge  
✅ Use conventional commits

## 🆘 Emergency Contacts

- **Workflow Questions**: See `WORKFLOW_QUICK_START.md`
- **Detailed Guide**: See `CONTRIBUTING.md`
- **Setup Help**: See `GITHUB_SETUP_GUIDE.md`
- **Stuck?**: Ask team lead

---

**Print this and keep it handy!** 📌

