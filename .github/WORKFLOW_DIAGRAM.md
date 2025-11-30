# Git Workflow Visual Diagram

## 🌊 Gitflow Workflow Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                          PRODUCTION                                 │
│  ╔══════════════════════════════════════════════════════════════╗  │
│  ║                         main branch                          ║  │
│  ║  (protected, stable, production-ready code)                  ║  │
│  ╚══════════════════════════════════════════════════════════════╝  │
│         ▲                                   ▲                        │
│         │                                   │                        │
│         │ PR (approved)                     │ hotfix only            │
│         │                                   │                        │
└─────────┼───────────────────────────────────┼────────────────────────┘
          │                                   │
┌─────────┼───────────────────────────────────┼────────────────────────┐
│         │            INTEGRATION            │                        │
│  ╔══════════════════════════════════════════════════════════════╗  │
│  ║                      develop branch                          ║  │
│  ║  (protected, integration of features, pre-production)        ║  │
│  ╚══════════════════════════════════════════════════════════════╝  │
│         ▲          ▲           ▲           ▲          ▲             │
│         │          │           │           │          │             │
│         │ PR       │ PR        │ PR        │ PR       │ PR          │
│         │          │           │           │          │             │
└─────────┼──────────┼───────────┼───────────┼──────────┼─────────────┘
          │          │           │           │          │
┌─────────┼──────────┼───────────┼───────────┼──────────┼─────────────┐
│  ┌──────┴─────┐  ┌─┴──────┐  ┌─┴──────┐  ┌─┴─────┐  ┌─┴──────┐     │
│  │ feature/   │  │bugfix/ │  │refactor│  │style/ │  │ docs/  │     │
│  │  auth      │  │ login  │  │   api  │  │navbar │  │ readme │     │
│  └────────────┘  └────────┘  └────────┘  └───────┘  └────────┘     │
│                    FEATURE BRANCHES                                  │
│  (short-lived, created from develop, merged back to develop)        │
└─────────────────────────────────────────────────────────────────────┘
```

## 📋 Branch Hierarchy

```
main (production)                    🔴 PROTECTED
  │
  ├── Tag: v1.0.0
  ├── Tag: v1.1.0
  └── Tag: v2.0.0
  
develop (integration)                🟡 PROTECTED
  │
  ├── feature/user-authentication    ✅ Merged
  ├── feature/payment-gateway        ✅ Merged
  ├── feature/student-dashboard      🔄 In Progress
  ├── bugfix/email-validation        ✅ Merged
  └── refactor/api-optimization      🔄 In Progress
```

## 🔄 Complete Development Cycle

### Step-by-Step Flow

```
1️⃣ START NEW FEATURE
   ├─ Checkout develop
   ├─ Pull latest changes
   └─ Create feature branch
   
      develop
        │
        └─➤ feature/my-feature
        
2️⃣ DEVELOP
   ├─ Write code
   ├─ Commit changes
   └─ Push to remote
   
      feature/my-feature
        │ git add .
        │ git commit -m "feat: add feature"
        └ git push origin feature/my-feature
        
3️⃣ CREATE PULL REQUEST
   ├─ Open PR on GitHub
   ├─ Target: develop (NOT main)
   └─ Request reviews
   
      feature/my-feature ──PR──➤ develop
                                   ▲
                        (base branch: develop)
        
4️⃣ CODE REVIEW
   ├─ Team reviews code
   ├─ CI/CD checks run
   ├─ Address feedback
   └─ Get approval
   
      PR #123: feature/my-feature → develop
      ├─ ✅ All checks passed
      ├─ ✅ 2 approvals received
      └─ ✅ No merge conflicts
        
5️⃣ MERGE TO DEVELOP
   ├─ Squash and merge
   ├─ Delete feature branch
   └─ Feature now in develop
   
      feature/my-feature ──✅──➤ develop
                                 (merged)
        
6️⃣ RELEASE TO PRODUCTION
   ├─ When develop is stable
   ├─ Create PR: develop → main
   ├─ Get approval
   └─ Merge to main
   
      develop ──PR──➤ main
                      (release v2.0.0)
        
7️⃣ TAG RELEASE
   ├─ Create git tag
   ├─ Document changes
   └─ Deploy to production
   
      main @ v2.0.0
      └─ Deployed to production 🚀
```

## 🚨 Hotfix Flow (Emergency Only)

```
PRODUCTION ISSUE DETECTED! 🔥

1️⃣ Branch from main
   main ──➤ hotfix/critical-bug

2️⃣ Fix the bug
   hotfix/critical-bug
     │ git commit -m "hotfix: fix critical bug"
     └ git push

3️⃣ PR to main (fast approval)
   hotfix/critical-bug ──PR──➤ main
                               (merge ASAP)

4️⃣ Also merge to develop
   main ──➤ develop
   (sync hotfix to develop)

   ┌───────────┐
   │   main    │◄─── hotfix/critical-bug
   └─────┬─────┘
         │
         │ sync
         ▼
   ┌───────────┐
   │  develop  │
   └───────────┘
```

## 🚫 Common Mistakes to Avoid

### ❌ WRONG: PR to main from feature

```
feature/my-feature ─────X────➤ main
                      (BLOCKED!)
```

### ✅ CORRECT: PR to develop from feature

```
feature/my-feature ──✅──➤ develop ──✅──➤ main
                                    (later)
```

### ❌ WRONG: Direct commit to protected branch

```
You ──commit──X──➤ main
              (REJECTED!)
```

### ✅ CORRECT: PR workflow

```
You ──commit──➤ feature/branch ──PR──➤ develop
```

## 📊 Parallel Development

Multiple developers working simultaneously:

```
develop
  ├── Developer 1: feature/user-profile
  ├── Developer 2: feature/payment-integration  
  ├── Developer 3: bugfix/navbar-mobile
  └── Developer 4: refactor/database-queries

All PRs → develop (independently)

Once all merged to develop:
  develop ──PR──➤ main (coordinated release)
```

## 🎯 Branch Protection Rules Visualization

```
┌────────────────────────────────────────────┐
│              main branch                   │
│ ┌────────────────────────────────────────┐ │
│ │ 🔒 Protection Rules:                   │ │
│ │ ✅ Require PR                          │ │
│ │ ✅ Require 2 approvals                 │ │
│ │ ✅ Require status checks               │ │
│ │ ✅ No direct pushes                    │ │
│ │ ✅ Only develop can merge              │ │
│ │ ✅ Administrators included             │ │
│ └────────────────────────────────────────┘ │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│            develop branch                  │
│ ┌────────────────────────────────────────┐ │
│ │ 🔒 Protection Rules:                   │ │
│ │ ✅ Require PR                          │ │
│ │ ✅ Require 1 approval                  │ │
│ │ ✅ Require status checks               │ │
│ │ ✅ No direct pushes                    │ │
│ │ ✅ Feature branches can merge          │ │
│ └────────────────────────────────────────┘ │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│         feature/* branches                 │
│ ┌────────────────────────────────────────┐ │
│ │ 🔓 No Protection:                      │ │
│ │ ✅ Direct commits allowed              │ │
│ │ ✅ Force push allowed                  │ │
│ │ ✅ Can be deleted                      │ │
│ │ ➡️  Must PR to develop                 │ │
│ └────────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

## 🎮 Interactive Command Flow

```bash
# DAILY WORKFLOW

# ┌─────────────────────────────────────┐
# │ Step 1: Start your day              │
# └─────────────────────────────────────┘
$ git checkout develop
$ git pull origin develop

# ┌─────────────────────────────────────┐
# │ Step 2: Create feature branch       │
# └─────────────────────────────────────┘
$ git checkout -b feature/my-awesome-feature

# ┌─────────────────────────────────────┐
# │ Step 3: Do your work                │
# └─────────────────────────────────────┘
# ... code code code ...

# ┌─────────────────────────────────────┐
# │ Step 4: Commit your changes         │
# └─────────────────────────────────────┘
$ git add .
$ git commit -m "feat: add awesome feature"

# ┌─────────────────────────────────────┐
# │ Step 5: Push to remote              │
# └─────────────────────────────────────┘
$ git push origin feature/my-awesome-feature

# ┌─────────────────────────────────────┐
# │ Step 6: Create PR on GitHub         │
# └─────────────────────────────────────┘
# Go to GitHub → Create Pull Request
# Base: develop ← Compare: feature/my-awesome-feature

# ┌─────────────────────────────────────┐
# │ Step 7: After merge, cleanup        │
# └─────────────────────────────────────┘
$ git checkout develop
$ git pull origin develop
$ git branch -d feature/my-awesome-feature
```

## 🏁 Release Timeline Example

```
Week 1-2: Feature Development
├─ feature/user-auth      → develop ✅
├─ feature/dashboard      → develop ✅
└─ bugfix/mobile-layout   → develop ✅

Week 3: Testing in develop
├─ QA testing
├─ Bug fixes
└─ Performance optimization

Week 4: Release
└─ develop → main ✅ (Release v2.0.0)
   ├─ Deploy to production
   ├─ Create git tag
   └─ Update changelog

┌─────────────────────────────────────────────┐
│           Timeline View                     │
├─────────────────────────────────────────────┤
│ Day 1-5:   Feature branches                 │
│ Day 6-10:  More features                    │
│ Day 11-15: Testing in develop               │
│ Day 16-20: Bug fixes                        │
│ Day 21:    Release to main                  │
│ Day 22+:   Start new cycle                  │
└─────────────────────────────────────────────┘
```

## 🎯 Key Takeaways

```
┌─────────────────────────────────────────────────┐
│  1. feature/* → develop (ALWAYS)                │
│  2. develop → main (RELEASES ONLY)              │
│  3. Never commit directly to main or develop    │
│  4. All changes go through Pull Requests        │
│  5. Get code reviews before merging             │
│  6. Keep feature branches short-lived           │
│  7. Delete branches after merging               │
│  8. Use conventional commit messages            │
└─────────────────────────────────────────────────┘
```

## 📚 Further Reading

- Full workflow guide: `CONTRIBUTING.md`
- Quick commands: `WORKFLOW_QUICK_START.md`
- Setup instructions: `GITHUB_SETUP_GUIDE.md`

---

**Remember**: When in doubt, ask your team lead! 🚀

