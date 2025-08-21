# 🤖 RobotICT Validator - FizzBuzz Pro

Modern web application for number validation based on divisibility rules with advanced configuration and analysis features.

## 🚀 How to run the application locally

### Prerequisites
- **Node.js** (version 16 or higher)
- **Meteor.js** framework

### Installation and setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd RobotICT_Developer_Interview_Exercise_basic_Jiri_Mika
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   meteor run
   ```

4. **Open browser:**
   - Application will be available at `http://localhost:3000`
   - If port 3000 is occupied, Meteor will automatically use the next available port

### Alternative run on different port
```bash
meteor run --port 3001
```

## 📋 Implementation explanation

### Application architecture
The application is built on **Meteor.js** framework with **React** components and uses **Tailwind CSS** for styling.

### File structure
```
├── client/
│   ├── main.css          # Global styles
│   ├── main.html         # HTML template
│   └── main.jsx          # Entry point
├── imports/
│   ├── api/
│   │   └── links.js      # API endpoints
│   ├── ui/
│   │   ├── App.jsx       # Main application
│   │   └── RobotICTGenerator.jsx  # Main component
│   └── utils/
│       └── numberGenerator.js     # Number generation logic
├── server/
│   └── main.js           # Server-side code
└── tests/
    └── main.js           # Tests
```

### Configuration and application state

#### 1. **Divisor configuration**
- **Storage:** React state (`divisor1`, `divisor2`)
- **Default values:** 3 and 5
- **Range:** 1-20
- **Updates:** Real-time when inputs change

#### 2. **Number range**
- **Storage:** React state (`minRange`, `maxRange`)
- **Default values:** 1-100
- **Dynamic limit:** No hard-coded maximum limit
- **Validation:** Check minimum < maximum value

#### 3. **Test number**
- **Storage:** React state (`inputNumber`)
- **Validation:** Must be within the set range
- **Default value:** 15

### Application logic

#### Function `getNumberText(number, divisor1, divisor2)`
```javascript
// In file: imports/utils/numberGenerator.js
export const getNumberText = (number, divisor1 = 3, divisor2 = 5) => {
  const isDivisibleBy1 = number % divisor1 === 0;
  const isDivisibleBy2 = number % divisor2 === 0;
  
  if (isDivisibleBy1 && isDivisibleBy2) {
    return "RobotICT";
  } else if (isDivisibleBy1) {
    return "Robot";
  } else if (isDivisibleBy2) {
    return "ICT";
  } else {
    return number.toString();
  }
};
```

#### Number sequence generation
```javascript
// In file: imports/utils/numberGenerator.js
export const generateNumberSequence = (min, max) => {
  // Input validation
  if (min > max) {
    throw new Error("Minimum value cannot be greater than maximum value");
  }
  
  // Generate sequence
  return Array.from(
    { length: max - min + 1 }, 
    (_, index) => min + index
  );
};
```

### Statistics and export

#### Statistics calculation
- **Real-time updates** when range or divisors change
- **Counting:** Robot, ICT, RobotICT, Numbers
- **Display:** Colored blocks with counts

#### File export
- **TXT format:** Structured text with metadata and statistics
- **CSV format:** Tabular format with detailed columns
- **Content:** Metadata, statistics, complete number list

## 🔧 Assumptions and trade-offs

### Assumptions

1. **User interface:**
   - User has modern browser with ES6+ support
   - User expects real-time updates
   - User prefers responsive design

2. **Performance:**
   - Dynamic range limits for optimal performance
   - Client-side validation for fast response
   - Static generation without server-side logic

3. **Functional:**
   - Divisors are positive integers 1-20
   - Number range is dynamic (no hard limit)
   - File export is client-side

### Trade-offs

1. **Performance vs. Functionality:**
   - ✅ **Chosen:** Dynamic range limits for flexible usage
   - ❌ **Alternative:** Unlimited range with lazy loading

2. **UX vs. Simplicity:**
   - ✅ **Chosen:** Real-time validation and updates
   - ❌ **Alternative:** Validation only on submit

3. **Flexibility vs. Stability:**
   - ✅ **Chosen:** Fixed limits for divisors (1-20)
   - ❌ **Alternative:** Unlimited divisors with performance risk

4. **Storage vs. Functionality:**
   - ✅ **Chosen:** React state (temporary storage)
   - ❌ **Alternative:** LocalStorage with potential data loss

### Technical decisions

1. **Meteor.js framework:**
   - **Advantages:** Fast development, hot-reload, integrated tools
   - **Disadvantages:** Larger bundle size, less flexible than custom setup

2. **Tailwind CSS:**
   - **Advantages:** Fast styling, consistent design
   - **Disadvantages:** Larger CSS bundle, learning curve

3. **Client-side export:**
   - **Advantages:** No server-side processing, immediate download
   - **Disadvantages:** Limited formatting options, browser dependency

## 🎯 Application features

### ✅ Implemented features
- [x] Divisor configuration (3 and 5)
- [x] Number range definition (e.g., 1-100)
- [x] Individual number testing
- [x] Range statistics (Robot, ICT, RobotICT, Numbers)
- [x] Export to TXT and CSV formats
- [x] Real-time validation and updates
- [x] Responsive design
- [x] Czech interface

### 🔮 Possible extensions
- [ ] Save configuration to LocalStorage
- [ ] Tested numbers history
- [ ] Charts and statistics visualization
- [ ] API endpoint for server-side processing
- [ ] Unit tests for logic
- [ ] Dark mode
- [ ] Export to JSON format

## 🐛 Known issues

1. **Node.js deprecation warning:**
   ```
   Warning: The util._extend API is deprecated. Please use Object.assign() instead.
   ```
   - **Cause:** Meteor.js framework uses deprecated API
   - **Impact:** Does not affect application functionality
   - **Solution:** Ignore or update Meteor

2. **Port conflicts:**
   - **Cause:** Another Meteor instance running on port 3000
   - **Solution:** Use `meteor run --port 3001`

## 📞 Support

For technical issues or questions, contact the development team.

---

**Version:** 1.0.0  
**Last updated:** 2024  
**Author:** Jiri Mika

