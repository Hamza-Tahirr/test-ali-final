# ChatPDF

A React and TypeScript front end for reading PDF files in the browser. You open a local PDF, go through it page by page, search the current page, and send a selected passage to a chat panel next to the document.

The chat panel is front end only for now. Messages are kept in the browser and no backend or language model is connected, so the Summarize button places the selected text in the chat panel instead of producing a summary.

## Features

- Open a PDF from your computer. The file is not uploaded anywhere; it is loaded through a local object URL.
- Sidebar with the name and size of the selected file.
- Page rendering with react-pdf (pdf.js), a page counter and Previous / Next buttons.
- Search box that highlights matches on the current page.
- Selecting text in the document shows a Summarize button that sends the selection to the chat panel.
- Chat panel where you can type messages and send them with Enter or the Send button.

## Tech stack

- React 18 and TypeScript, set up with Create React App (react-scripts 5)
- react-pdf 7 for rendering PDFs
- Tailwind CSS 3 with a shadcn/ui configuration
- Jest and React Testing Library for tests

## Project structure

```
public/                    HTML template, icons and web manifest
src/
  index.tsx                entry point
  App.tsx                  three-column layout: file picker, viewer, chat
  PDFUpload.tsx            file picker sidebar
  PDFViewer.tsx            PDF rendering, paging, search and text selection
  PDFViewer.css            viewer styles
  Chat.tsx                 chat panel
  Chat.test.tsx            tests for the chat panel
  components/ui/input.tsx  shadcn/ui input component
  lib/utils.ts             cn() helper for merging Tailwind classes
tailwind.config.js         Tailwind theme
components.json            shadcn/ui settings
```

## Getting started

You need Node.js 18 or newer and npm.

```bash
git clone https://github.com/Hamza-Tahirr/test-ali-final.git
cd test-ali-final
npm install
npm start
```

The app runs at http://localhost:3000. No environment variables are needed.

The pdf.js worker is loaded from cdnjs, so the viewer needs an internet connection to render pages.

## Scripts

- `npm start` runs the development server
- `npm test` runs the tests in watch mode
- `npm run build` creates a production build in `build/`

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
