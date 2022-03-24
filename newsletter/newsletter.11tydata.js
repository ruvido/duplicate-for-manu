require('dotenv').config();

const isDevEnv = process.env.ELEVENTY_ENV === 'development';
const todaysDate = new Date().toISOString().substring(0,10)
let postDate = data => data.page.date.toISOString().substring(0,10)
let sendNewsletter = data => {
    return postDate(data) === todaysDate
}

let isFuture = data => {
    return postDate(data) > todaysDate ? true : false
}

module.exports = ()=> {
    return {
        tags: 'newsletter',
        layout: 'newsletter.njk',
        permalink: "/newsletter/{{title | slug }}/",
        eleventyComputed: {
            todaysDate:     todaysDate,
            postDate:       data => postDate(data),
            futureDate:     data => isFuture(data),
            //eleventyExcludeFromCollections: data => isFuture(data),
            permalink: data => isFuture(data) ? false : data.permalink,
        }
    }
}



            //someData: async data => {
            //    console.log('DIRNAME:::: '+ __dirname)
            //    const filePath = data.page.inputPath.replace("./_content/posts", __dirname);
            //    const fileContent = await fs.readFileSync(filePath, 'utf8');
            //    // not good because the file is written to netlify
            //    // NOT pushed to github
            //    fs.writeSync(fs.openSync(filePath+'.lock', 'a+'), 'sent', null, 'utf-8');
            //    return 'BUUM';


//////module.exports = ()=> {
//////    console.log('=======')
//////    console.log('=======')
//////    //const isToday = todaysDate === data.page.date
//////    const pageDate = data => data.page.date.toISOString().substring(0,10)
//////    const isToday = pageDate === todaysDate
//////    //console.log('PAGEDATE: '+ pageDate())
//////    //console.log('TODAYSTE: '+ todaysDate)
//////    return {
//////        eleventyComputed: {
////////            caz:            showDraft(data),
//////            pageDate:       pageDate,
//////            isToday:        isToday,
//////            todaysDate:     todaysDate,
//////            newsletterSend: isToday ? true : false,
//////            futureDate:     pageDate > todaysDate ? true : false,
//////            //eleventyExcludeFromCollections: data => showDraft(data) ? data.eleventyExcludeFromCollections : true,
//////            //permalink: data => showDraft(data) ? data.permalink : false,
//////        }
//////    }
//////}
