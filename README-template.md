# Frontend Mentor - Job listings with filtering solution

This is a solution to the [Job listings with filtering challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/job-listings-with-filtering-ivstIPCt). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Filter job listings based on the categories

### Screenshot

![](./screenshot.jpg)


### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- AJAX
- [Handlebars](https://reactjs.org/) - Handlebars JS library


### What I learned

I really hard a time using arrays in the challenge, but this challenge forced me to learn more about AJAX request and other array methods.

```js
  const filteredJobs = jobs.filter(function (job) {
      return (filters.role === "" || job.role === filters.role) &&
          (filters.level === "" || job.level === filters.level) &&
          (filters.languages.length === 0 || filters.languages.every(lang => job.languages.includes(lang))) &&
          (filters.tools.length === 0 || filters.tools.every(tool => job.tools.includes(tool)))
  });
```

I also was introduced to the Handlebars js library thanks to ChatGPT, which made it easier to structure my string templates

### Continued development

I still have a lot to learn 
**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [Jonhn Smilgas vanilla javascript project](https://www.example.com) - This helped me learn the way of using the filter() and map() array methods in filtering out the jobs
- [ChatGPT](https://www.chat.openai.com) - This AI helped me in suggesting ways that i can filter the jobs being shown

## Author

- Frontend Mentor - [https://www.frontendmentor.io/profile/Amaefula-Joel](https://www.frontendmentor.io/profile/amaefulajoel)
- Twitter - [@Amaefulajoel](https://www.twitter.com/Amaefulajoel)

## Acknowledgments

Special thanks to John Smilga and the OpenAI team for creating ChaatGPT which helped me a lot in this project
