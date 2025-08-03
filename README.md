# Batch Emails

This project demonstrates algorithms for batching email messages such that no batch contains duplicate email addresses. It includes multiple implementations and a comprehensive test suite to compare correctness and performance.

## Features

- **Multiple batching algorithms:**  
  - `version1.js`: Basic approach.
  - `version2.js`: Queue-based approach.
  - `version3.js`: Efficient set-based approach.
- **Configurable sample data:**  
  - Easily generate large datasets with unique and duplicate emails.
- **Comprehensive tests:**  
  - Validates correctness, uniqueness, and even distribution.
  - Benchmarks performance for each algorithm.

## Usage

### Running Tests

To run all tests and compare algorithm performance:

```bash
node tests.js
```

This will output assertion results and timing for each algorithm.

### Modifying Sample Size

Edit `tests.js` and adjust these variables to change dataset size:

```javascript
const NUM_UNIQUE = 40000; // Number of unique emails
const NUM_DUPES = 10000;  // Number of duplicate emails
```

## File Overview

- `version1.js`, `version2.js`, `version3.js`: Different batching implementations.
- `samples.js`: Example email data.
- `tests.js`: Test suite and benchmarks.
- `README.md`: Project documentation.

## Algorithm Comparison

| Version   | Approach         | Pros                      | Cons                        |
|-----------|------------------|---------------------------|-----------------------------|
| version1  | Basic            | Simple, easy to follow    | Not optimal for large data  |
| version2  | Queue-based      | Good for moderate data    | Can be slow for many batches|
| version3  | Set-based        | Efficient for large data  | Slightly more memory usage  |

## Customization

- Add new batching algorithms by creating additional files.
- Extend tests in `tests.js` for more scenarios.

## Requirements

- Node.js (v18+ recommended)
- Ubuntu 24.04.2 LTS (dev container)

## License

MIT License

---

**Feedback and contributions welcome!**
