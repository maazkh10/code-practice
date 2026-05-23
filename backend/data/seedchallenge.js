import mongoose from "mongoose";
import Challenge from "../model/Challenge.model.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url"; // Add this

// --- Recreate __dirname for ES Modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Now this line will work perfectly
dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("URI Check:", process.env.MONGO_URI ? "Found!" : "Still Undefined");

async function seed(params) {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    const seedData = [
  { day: 1, problems: [
    { title: "FizzBuzz", difficulty: "easy", description: "Return final value for 15.", expectedOutput: "FizzBuzz", answerType: "string" },
    { title: "Find Max", difficulty: "easy", description: "Largest in [1,5,3,9,2].", expectedOutput: 9, answerType: "number" },
    { title: "Even or Odd", difficulty: "easy", description: "Return result for 10.", expectedOutput: "even", answerType: "string" },
    { title: "Array Chunking", difficulty: "medium", description: "Chunk [1,2,3,4] size 2.", expectedOutput: [[1,2],[3,4]], answerType: "array" },
    { title: "Longest Substring", difficulty: "hard", description: "abcabcbb result.", expectedOutput: 3, answerType: "number" }
  ]},
  { day: 2, problems: [
    { title: "Factorial", difficulty: "easy", description: "Factorial of 5.", expectedOutput: 120, answerType: "number" },
    { title: "Title Case", difficulty: "easy", description: "hello world.", expectedOutput: "Hello World", answerType: "string" },
    { title: "Sum of Array", difficulty: "easy", description: "Sum [10,20,30].", expectedOutput: 60, answerType: "number" },
    { title: "Group Anagrams", difficulty: "medium", description: "Group words.", expectedOutput: [["eat","tea","ate"],["tan","nat"],["bat"]], answerType: "array" },
    { title: "Median Arrays", difficulty: "hard", description: "Median of [1,3],[2].", expectedOutput: 2, answerType: "number" }
  ]},
  { day: 3, problems: [
    { title: "Vowel Count", difficulty: "easy", description: "coding is fun", expectedOutput: 4, answerType: "number" },
    { title: "Remove Duplicates", difficulty: "easy", description: "[1,1,2,2,3]", expectedOutput: [1,2,3], answerType: "array" },
    { title: "Fibonacci", difficulty: "easy", description: "n=6", expectedOutput: 8, answerType: "number" },
    { title: "Compression", difficulty: "medium", description: "aaabbc", expectedOutput: "a3b2c1", answerType: "string" },
    { title: "Merge Lists", difficulty: "hard", description: "sorted merge", expectedOutput: [1,1,2,3,4,4,5,6], answerType: "array" }
  ]},
  { day: 4, problems: [
    { title: "Longest Word", difficulty: "easy", description: "The quick brown fox", expectedOutput: "quick", answerType: "string" },
    { title: "Is Anagram", difficulty: "easy", description: "listen silent", expectedOutput: true, answerType: "boolean" },
    { title: "C to F", difficulty: "easy", description: "30C", expectedOutput: 86, answerType: "number" },
    { title: "Rotate Array", difficulty: "medium", description: "[1,2,3,4,5] by 2", expectedOutput: [4,5,1,2,3], answerType: "array" },
    { title: "Rain Water", difficulty: "hard", description: "trap water", expectedOutput: 6, answerType: "number" }
  ]},
  { day: 5, problems: [
    { title: "Object Keys", difficulty: "easy", description: "{a:1,b:2}", expectedOutput: ["a","b"], answerType: "array" },
    { title: "Repeat String", difficulty: "easy", description: "abc x3", expectedOutput: "abcabcabc", answerType: "string" },
    { title: "Find Index", difficulty: "easy", description: "apple index", expectedOutput: 1, answerType: "number" },
    { title: "Spiral Matrix", difficulty: "medium", description: "3x3", expectedOutput: [1,2,3,6,9,8,7,4,5], answerType: "array" },
    { title: "Word Ladder", difficulty: "hard", description: "hit to cog", expectedOutput: 5, answerType: "number" }
  ]},
  { day: 6, problems: [
    { title: "Truncate", difficulty: "easy", description: "Hello World >5", expectedOutput: "Hello...", answerType: "string" },
    { title: "Confirm Ending", difficulty: "easy", description: "Bastian n", expectedOutput: true, answerType: "boolean" },
    { title: "Square Digits", difficulty: "easy", description: "9119", expectedOutput: 811181, answerType: "number" },
    { title: "Valid Sudoku", difficulty: "medium", description: "valid board", expectedOutput: true, answerType: "boolean" },
    { title: "Edit Distance", difficulty: "hard", description: "horse ros", expectedOutput: 3, answerType: "number" }
  ]},
  { day: 7, problems: [
    { title: "Missing Number", difficulty: "easy", description: "[3,0,1]", expectedOutput: 2, answerType: "number" },
    { title: "Filter Falsy", difficulty: "easy", description: "remove falsy", expectedOutput: [7,"at",9], answerType: "array" },
    { title: "Power of Two", difficulty: "easy", description: "16?", expectedOutput: true, answerType: "boolean" },
    { title: "Rotated Search", difficulty: "medium", description: "find 0", expectedOutput: 4, answerType: "number" },
    { title: "N Queens", difficulty: "hard", description: "4 queens count", expectedOutput: 2, answerType: "number" }
  ]},
  { day: 8, problems: [
    { title: "Last Element", difficulty: "easy", description: "[1,2,3]", expectedOutput: 3, answerType: "number" },
    { title: "Count Consonants", difficulty: "easy", description: "hello", expectedOutput: 3, answerType: "number" },
    { title: "Double Array", difficulty: "easy", description: "[1,2,3]", expectedOutput: [2,4,6], answerType: "array" },
    { title: "3Sum", difficulty: "medium", description: "triplets", expectedOutput: [[-1,-1,2],[-1,0,1]], answerType: "array" },
    { title: "First Missing Positive", difficulty: "hard", description: "[3,4,-1,1]", expectedOutput: 2, answerType: "number" }
  ]},
  { day: 9, problems: [
    { title: "Has Property", difficulty: "easy", description: "{a:1} has a", expectedOutput: true, answerType: "boolean" },
    { title: "Average", difficulty: "easy", description: "[1,2,3,4,5]", expectedOutput: 3, answerType: "number" },
    { title: "To Binary", difficulty: "easy", description: "10", expectedOutput: "1010", answerType: "string" },
    { title: "Kth Largest", difficulty: "medium", description: "2nd largest", expectedOutput: 5, answerType: "number" },
    { title: "Valid Parentheses Length", difficulty: "hard", description: "()(()", expectedOutput: 4, answerType: "number" }
  ]},
  { day: 10, problems: [
    { title: "Capitalize Words", difficulty: "easy", description: "js is cool", expectedOutput: "Js Is Cool", answerType: "string" },
    { title: "Next Power of 2", difficulty: "easy", description: ">10", expectedOutput: 16, answerType: "number" },
    { title: "Sum Primes", difficulty: "easy", description: "up to 10", expectedOutput: 17, answerType: "number" },
    { title: "Product Except Self", difficulty: "medium", description: "[1,2,3,4]", expectedOutput: [24,12,8,6], answerType: "array" },
    { title: "Sudoku Solver", difficulty: "hard", description: "solved board exists", expectedOutput: true, answerType: "boolean" }
  ]},
  { day: 11, problems: [
    { title: "Find the Vowels", difficulty: "easy", description: "Count 'aeiou'", expectedOutput: 3, answerType: "number" },
    { title: "Array Intersection", difficulty: "easy", description: "[1,2] & [2,3]", expectedOutput: [2], answerType: "array" },
    { title: "Check Sorted", difficulty: "easy", description: "[1,2,3]", expectedOutput: true, answerType: "boolean" },
    { title: "Subarray Sum", difficulty: "medium", description: "Target sum 5", expectedOutput: [2,3], answerType: "array" },
    { title: "Binary Tree Depth", difficulty: "hard", description: "Max depth", expectedOutput: 3, answerType: "number" }
  ]},
  { day: 12, problems: [
    { title: "Square Root", difficulty: "easy", description: "Sqrt of 64", expectedOutput: 8, answerType: "number" },
    { title: "String Reverse", difficulty: "easy", description: "abc to cba", expectedOutput: "cba", answerType: "string" },
    { title: "Min Element", difficulty: "easy", description: "[10, 2, 5]", expectedOutput: 2, answerType: "number" },
    { title: "Longest Prefix", difficulty: "medium", description: "flower, flow", expectedOutput: "fl", answerType: "string" },
    { title: "Merge Intervals", difficulty: "hard", description: "Overlap fix", expectedOutput: [[1,6]], answerType: "array" }
  ]},
  { day: 13, problems: [
    { title: "Count Words", difficulty: "easy", description: "Hi there", expectedOutput: 2, answerType: "number" },
    { title: "To Lowercase", difficulty: "easy", description: "HELLO", expectedOutput: "hello", answerType: "string" },
    { title: "Is Positive", difficulty: "easy", description: "-5", expectedOutput: false, answerType: "boolean" },
    { title: "Permutations", difficulty: "medium", description: "[1,2]", expectedOutput: [[1,2],[2,1]], answerType: "array" },
    { title: "Trapping Rain", difficulty: "hard", description: "Volume calc", expectedOutput: 9, answerType: "number" }
  ]},
  { day: 14, problems: [
    { title: "First Letter", difficulty: "easy", description: "Apple", expectedOutput: "A", answerType: "string" },
    { title: "Sum Digits", difficulty: "easy", description: "123", expectedOutput: 6, answerType: "number" },
    { title: "Array Length", difficulty: "easy", description: "[1,2]", expectedOutput: 2, answerType: "number" },
    { title: "Set Matrix Zeroes", difficulty: "medium", description: "Zero rows", expectedOutput: true, answerType: "boolean" },
    { title: "Reverse Nodes k", difficulty: "hard", description: "Linked list", expectedOutput: [2,1,4,3], answerType: "array" }
  ]},
  { day: 15, problems: [
    { title: "Repeat Char", difficulty: "easy", description: "a x 2", expectedOutput: "aa", answerType: "string" },
    { title: "Absolute Diff", difficulty: "easy", description: "5-10", expectedOutput: 5, answerType: "number" },
    { title: "Is Array", difficulty: "easy", description: "[]", expectedOutput: true, answerType: "boolean" },
    { title: "Jump Game", difficulty: "medium", description: "Can reach end?", expectedOutput: true, answerType: "boolean" },
    { title: "Text Justification", difficulty: "hard", description: "Full alignment", expectedOutput: ["text "], answerType: "array" }
  ]},
  { day: 16, problems: [
    { title: "Cube Number", difficulty: "easy", description: "3^3", expectedOutput: 27, answerType: "number" },
    { title: "Join Strings", difficulty: "easy", description: "a + b", expectedOutput: "ab", answerType: "string" },
    { title: "Is Integer", difficulty: "easy", description: "5.5", expectedOutput: false, answerType: "boolean" },
    { title: "Top K Elements", difficulty: "medium", description: "Frequency", expectedOutput: [1,2], answerType: "array" },
    { title: "Wildcard Match", difficulty: "hard", description: "Regex pattern", expectedOutput: true, answerType: "boolean" }
  ]},
  { day: 17, problems: [
    { title: "Last Char", difficulty: "easy", description: "Code", expectedOutput: "e", answerType: "string" },
    { title: "Multiply", difficulty: "easy", description: "4 * 5", expectedOutput: 20, answerType: "number" },
    { title: "Has Space", difficulty: "easy", description: "NoSpace", expectedOutput: false, answerType: "boolean" },
    { title: "Unique Paths", difficulty: "medium", description: "Robot grid", expectedOutput: 28, answerType: "number" },
    { title: "Serialize Tree", difficulty: "hard", description: "Binary structure", expectedOutput: "1,2,3", answerType: "string" }
  ]},
  { day: 18, problems: [
    { title: "Remainder", difficulty: "easy", description: "10 % 3", expectedOutput: 1, answerType: "number" },
    { title: "Trim String", difficulty: "easy", description: "  hi  ", expectedOutput: "hi", answerType: "string" },
    { title: "Includes 5", difficulty: "easy", description: "[1,5]", expectedOutput: true, answerType: "boolean" },
    { title: "Coin Change", difficulty: "medium", description: "Fewest coins", expectedOutput: 3, answerType: "number" },
    { title: "Shortest Path", difficulty: "hard", description: "Graph algo", expectedOutput: 4, answerType: "number" }
  ]},
  { day: 19, problems: [
    { title: "Divide", difficulty: "easy", description: "10 / 2", expectedOutput: 5, answerType: "number" },
    { title: "Starts With A", difficulty: "easy", description: "Apple", expectedOutput: true, answerType: "boolean" },
    { title: "Arr to String", difficulty: "easy", description: "[1,2]", expectedOutput: "1,2", answerType: "string" },
    { title: "Longest Sequence", difficulty: "medium", description: "Consecutive", expectedOutput: 4, answerType: "number" },
    { title: "Median Stream", difficulty: "hard", description: "Running median", expectedOutput: 15, answerType: "number" }
  ]},
  { day: 20, problems: [
    { title: "Array Sum", difficulty: "easy", description: "Sum [1,1]", expectedOutput: 2, answerType: "number" },
    { title: "Negate Bool", difficulty: "easy", description: "!true", expectedOutput: false, answerType: "boolean" },
    { title: "Hello Name", difficulty: "easy", description: "Name: Jo", expectedOutput: "Hello Jo", answerType: "string" },
    { title: "Letter Combos", difficulty: "medium", description: "Phone digits", expectedOutput: ["ad", "ae"], answerType: "array" },
    { title: "Largest Rect", difficulty: "hard", description: "Histogram", expectedOutput: 10, answerType: "number" }
  ]},
  { day: 21, problems: [
    { title: "Check Null", difficulty: "easy", description: "is null?", expectedOutput: true, answerType: "boolean" },
    { title: "Add One", difficulty: "easy", description: "9 + 1", expectedOutput: 10, answerType: "number" },
    { title: "Split String", difficulty: "easy", description: "a-b-c", expectedOutput: ["a","b","c"], answerType: "array" },
    { title: "Word Search", difficulty: "medium", description: "Grid search", expectedOutput: true, answerType: "boolean" },
    { title: "Max Path Sum", difficulty: "hard", description: "Binary tree", expectedOutput: 42, answerType: "number" }
  ]},
  { day: 22, problems: [
    { title: "Double Num", difficulty: "easy", description: "2 * 2", expectedOutput: 4, answerType: "number" },
    { title: "Is Empty", difficulty: "easy", description: "''", expectedOutput: true, answerType: "boolean" },
    { title: "Get Type", difficulty: "easy", description: "typeof 5", expectedOutput: "number", answerType: "string" },
    { title: "House Robber", difficulty: "medium", description: "Max loot", expectedOutput: 12, answerType: "number" },
    { title: "Interleaving", difficulty: "hard", description: "String weave", expectedOutput: true, answerType: "boolean" }
  ]},
  { day: 23, problems: [
    { title: "Decrement", difficulty: "easy", description: "5 - 1", expectedOutput: 4, answerType: "number" },
    { title: "Upper Case", difficulty: "easy", description: "hi", expectedOutput: "HI", answerType: "string" },
    { title: "Is 100", difficulty: "easy", description: "100?", expectedOutput: true, answerType: "boolean" },
    { title: "Decode Ways", difficulty: "medium", description: "A=1, B=2", expectedOutput: 2, answerType: "number" },
    { title: "Burst Balloons", difficulty: "hard", description: "Max coins", expectedOutput: 167, answerType: "number" }
  ]},
  { day: 24, problems: [
    { title: "Get First", difficulty: "easy", description: "[7,8]", expectedOutput: 7, answerType: "number" },
    { title: "Add Space", difficulty: "easy", description: "A,B", expectedOutput: "A B", answerType: "string" },
    { title: "Is False", difficulty: "easy", description: "val", expectedOutput: false, answerType: "boolean" },
    { title: "Sort Colors", difficulty: "medium", description: "0,1,2 sort", expectedOutput: [0,0,1,1,2,2], answerType: "array" },
    { title: "Smallest Range", difficulty: "hard", description: "K lists", expectedOutput: [20,24], answerType: "array" }
  ]},
  { day: 25, problems: [
    { title: "Area Square", difficulty: "easy", description: "side 4", expectedOutput: 16, answerType: "number" },
    { title: "Concat", difficulty: "easy", description: "[1]+[2]", expectedOutput: [1,2], answerType: "array" },
    { title: "Is Weekend", difficulty: "easy", description: "Sat", expectedOutput: true, answerType: "boolean" },
    { title: "Valid Partition", difficulty: "medium", description: "Subsets", expectedOutput: true, answerType: "boolean" },
    { title: "Min Window", difficulty: "hard", description: "Substring", expectedOutput: "BANC", answerType: "string" }
  ]},
  { day: 26, problems: [
    { title: "Char Code", difficulty: "easy", description: "'A'", expectedOutput: 65, answerType: "number" },
    { title: "Repeat Word", difficulty: "easy", description: "Go! Go!", expectedOutput: "Go!Go!", answerType: "string" },
    { title: "Is Defined", difficulty: "easy", description: "val", expectedOutput: true, answerType: "boolean" },
    { title: "Trie Insert", difficulty: "medium", description: "Prefix tree", expectedOutput: true, answerType: "boolean" },
    { title: "Regular Expression", difficulty: "hard", description: ".* pattern", expectedOutput: true, answerType: "boolean" }
  ]},
  { day: 27, problems: [
    { title: "Power of 3", difficulty: "easy", description: "27?", expectedOutput: true, answerType: "boolean" },
    { title: "Join Dash", difficulty: "easy", description: "a,b", expectedOutput: "a-b", answerType: "string" },
    { title: "Half Val", difficulty: "easy", description: "10", expectedOutput: 5, answerType: "number" },
    { title: "Gas Station", difficulty: "medium", description: "Circuit", expectedOutput: 3, answerType: "number" },
    { title: "Merge K Lists", difficulty: "hard", description: "Sorted merge", expectedOutput: [1,1,2], answerType: "array" }
  ]},
  { day: 28, problems: [
    { title: "Floor Val", difficulty: "easy", description: "4.9", expectedOutput: 4, answerType: "number" },
    { title: "Is Lower", difficulty: "easy", description: "abc", expectedOutput: true, answerType: "boolean" },
    { title: "Array Wrap", difficulty: "easy", description: "5", expectedOutput: [5], answerType: "array" },
    { title: "Course Schedule", difficulty: "medium", description: "DAG check", expectedOutput: true, answerType: "boolean" },
    { title: "Binary Tree Max", difficulty: "hard", description: "Path sum", expectedOutput: 42, answerType: "number" }
  ]},
  { day: 29, problems: [
    { title: "Ceil Val", difficulty: "easy", description: "4.1", expectedOutput: 5, answerType: "number" },
    { title: "Invert Bool", difficulty: "easy", description: "false", expectedOutput: true, answerType: "boolean" },
    { title: "Tail", difficulty: "easy", description: "[1,2,3]", expectedOutput: [2,3], answerType: "array" },
    { title: "Longest Path", difficulty: "medium", description: "Matrix", expectedOutput: 4, answerType: "number" },
    { title: "Palindromic Sub", difficulty: "hard", description: "Count all", expectedOutput: 6, answerType: "number" }
  ]},
  { day: 30, problems: [
    { title: "Final Count", difficulty: "easy", description: "1 to 10", expectedOutput: 10, answerType: "number" },
    { title: "Last Day", difficulty: "easy", description: "is 30", expectedOutput: true, answerType: "boolean" },
    { title: "Goodbye", difficulty: "easy", description: "String", expectedOutput: "Complete", answerType: "string" },
    { title: "LRU Cache", difficulty: "medium", description: "Design", expectedOutput: 1, answerType: "number" },
    { title: "Max Points", difficulty: "hard", description: "On a line", expectedOutput: 3, answerType: "number" }
  ]}
];


await Challenge.deleteMany();
await Challenge.insertMany(seedData);
console.log("Challenges seeded successfully!");
process.exit()

  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }

}

seed()
