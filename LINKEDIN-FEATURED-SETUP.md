# LinkedIn Featured Section Setup Guide

## 🎯 Adding Your PDF Resume to LinkedIn Featured Section

### Step 1: Create Your PDF Resume

1. **Option A - Print from Browser:**
   - Visit `https://bruuce.com/resume/`
   - Press `Ctrl+P` (Windows) or `Cmd+P` (Mac)
   - Select "Save as PDF"
   - Choose "More settings" → "Options" → Check "Background graphics"
   - Save as `bruce-denham-resume.pdf`

2. **Option B - Use the Script (Advanced):**

   ```bash
   npm install puppeteer
   node scripts/generate-resume-pdf.js
   ```

3. **Option C - Manual Design:**
   - Use Canva, Adobe InDesign, or Google Docs
   - Copy content from your resume page
   - Export as PDF

### Step 2: Upload to Your Site

1. Place the PDF file in `public/resume/bruce-denham-resume.pdf`
2. Deploy your site
3. Verify it's accessible at: `https://bruuce.com/resume/bruce-denham-resume.pdf`

### Step 3: Add to LinkedIn Featured Section

#### 3.1 Access Featured Section

1. Go to your LinkedIn profile
2. Click "Add profile section" (+ button)
3. Select "Recommended" → "Featured"
4. Choose "Media"

#### 3.2 Upload Your Resume

1. Click "Upload" and select your PDF
2. **Title:** `Senior Technical Writer & DX Engineer - Complete Resume`
3. **Description:**

   ```
   📄 Complete resume showcasing 30+ years of technical writing and developer experience expertise.

   🏆 Adobe award nominee specializing in:
   • API documentation & SDK development
   • Developer tools & interactive tutorials
   • React applications & CLI tools
   • Documentation architecture & strategy

   💼 Ready to transform your developer experience? Let's connect!

   🔗 Live version: https://bruuce.com/resume/
   ```

#### 3.3 Alternative - Link to Live Resume

Instead of uploading PDF, you can link to your live resume:

1. Choose "Link" instead of "Media"
2. **URL:** `https://bruuce.com/resume/`
3. **Title:** `Interactive Resume - Bruce Denham`
4. **Description:** Same as above

### Step 4: Optimize for Maximum Impact

#### 4.1 Featured Section Best Practices

- **Order matters:** Put your resume first in Featured section
- **Update regularly:** Refresh when you add new achievements
- **Cross-promote:** Mention in posts and articles

#### 4.2 Additional Featured Items to Consider

1. **Portfolio Projects:** Link to `https://bruuce.com/work/`
2. **Blog Articles:** Your best technical writing pieces
3. **Speaking Engagements:** Meet Magento Indonesia presentation
4. **Open Source:** PageBuilder Examples repository

### Step 5: Promotion Strategy

#### 5.1 LinkedIn Post Announcement

```
🎉 Just updated my LinkedIn Featured section with my complete resume!

📄 30+ years of technical writing & developer experience expertise
🏆 Adobe award nominee
🛠️ Specialized in API docs, SDK development & developer tools

Check it out in my Featured section below, or view the interactive version at bruuce.com/resume/

#TechnicalWriting #DeveloperExperience #Adobe #Resume #OpenToWork
```

#### 5.2 Direct Sharing

Your resume will be available at these URLs:

- **PDF:** `https://bruuce.com/resume/bruce-denham-resume.pdf`
- **Live:** `https://bruuce.com/resume/`

Perfect for:

- Email signatures
- Job applications
- Recruiter outreach
- Networking conversations

### Step 6: Analytics & Tracking

Consider adding UTM parameters for tracking:

- **From LinkedIn:** `https://bruuce.com/resume/?utm_source=linkedin&utm_medium=featured`
- **From Email:** `https://bruuce.com/resume/?utm_source=email&utm_medium=signature`

This helps you understand which channels drive the most resume views!

---

## 🚀 Quick Checklist

- [ ] Create PDF resume
- [ ] Upload to `public/resume/bruce-denham-resume.pdf`
- [ ] Deploy site and verify PDF link works
- [ ] Add to LinkedIn Featured section
- [ ] Write LinkedIn announcement post
- [ ] Update email signature with resume link
- [ ] Test all links and downloads

**Need help?** The PDF download link is already added to your resume page with a clear call-to-action for LinkedIn Featured section usage!
