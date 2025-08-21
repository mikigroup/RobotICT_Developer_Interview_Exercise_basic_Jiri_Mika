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
- **Range:** Any positive integer (fully configurable)
- **Updates:** Real-time when inputs change

#### 2. **Number range**
- **Storage:** React state (`minRange`, `maxRange`)
- **Default values:** 1-100
- **Dynamic limit:** User can set any range (e.g., 1-100, 50-150, 1-1000)
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

---

**Version:** 1.0.0  
**Last updated:** 22.8.2025  
**Author:** Jiri Mika - info@mikigroup.cz

