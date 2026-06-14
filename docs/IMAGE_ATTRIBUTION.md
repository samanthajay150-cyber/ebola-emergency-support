# 🖼️ Image Assets & Attribution

## Real Ebola Healthcare Images Used

All images used on this platform are sourced from Unsplash and are free to use under the unsplash License.

### Images Downloaded:

1. **Hero Banner - Healthcare Workers**
   - Filename: `hero-healthcare-workers.jpg`
   - Source: Unsplash - National Cancer Institute
   - Description: Healthcare workers in protective gear
   - License: Free to use under Unsplash License

2. **Doctor Treatment**
   - Filename: `doctor-treatment.jpg`
   - Source: Unsplash
   - Description: Medical professional providing treatment
   - License: Free to use under Unsplash License

3. **Medical Team**
   - Filename: `medical-team.jpg`
   - Source: Unsplash
   - Description: Team of healthcare professionals
   - License: Free to use under Unsplash License

4. **Volunteer Healthcare**
   - Filename: `volunteer-healthcare.jpg`
   - Source: Unsplash
   - Description: Volunteer healthcare worker
   - License: Free to use under Unsplash License

5. **Ebola Research**
   - Filename: `ebola-research.jpg`
   - Source: Unsplash - NIAID
   - Description: Medical research and testing
   - License: Free to use under Unsplash License

6. **Healthcare Support**
   - Filename: `healthcare-support.jpg`
   - Source: Unsplash
   - Description: Healthcare support services
   - License: Free to use under Unsplash License

7. **Medical Testing**
   - Filename: `medical-testing.jpg`
   - Source: Unsplash - NIAID
   - Description: Medical testing and diagnostics
   - License: Free to use under Unsplash License

## Usage Rights

All images are:
- ✅ Free to use for commercial purposes
- ✅ No attribution required (though appreciated)
- ✅ Modifiable and adaptable

## Image Locations

Images are stored in:
- Development: `/public/images/`
- Production: `/dist/images/`
- Public URL: `https://ebola-emergency-support-jakemore.zocomputer.io/images/[filename]`

## Loading Instructions

To prevent caching issues, images can be loaded with cache-busting:
```javascript
<img src={`/images/hero-healthcare-workers.jpg?t=${Date.now()}`} />
```

Or using the standard path:
```javascript
<img src="/images/hero-healthcare-workers.jpg" alt="Healthcare workers" />
```

---

**Note**: These images represent general healthcare scenarios and are used to create a professional, empathetic atmosphere for the Ebola Emergency Support platform. They do not depict actual Ebola patients or specific Ebola treatment centers to protect patient privacy and dignity.
