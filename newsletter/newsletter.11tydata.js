require('dotenv').config();
const fs = require('fs');

const isDevEnv = process.env.ELEVENTY_ENV === 'development';
const todaysDate = new Date().toISOString().substring(0,10)
//const newsletterSend = 
//const futureDate = 


let caaz = data => console.log('aaaaHHHHHH '+data.page.date)

let postDate = data => data.page.date.toISOString().substring(0,10)
let sendNewsletter = data => {
    // be SURE to send the newsletter only ONCE 
    //      -> lock file?
    //      -> db entry sent?
    return postDate(data) === todaysDate
}


module.exports = ()=> {
    return {
        eleventyComputed: {
            todaysDate:     todaysDate,
            postDate:       data => postDate(data),
            futureDate:     data => postDate(data) > todaysDate ? true : false,
            sendNewsletter: data => sendNewsletter(data),
            caz: data => data.page.date,
            someData: async data => {
                console.log('DIRNAME:::: '+ __dirname)
                const filePath = data.page.inputPath.replace("./_content/posts", __dirname);
                const fileContent = await fs.readFileSync(filePath, 'utf8');
                // not good because the file is written to netlify
                // NOT pushed to github
                fs.writeSync(fs.openSync(filePath+'.lock', 'a+'), 'sent', null, 'utf-8');
                return 'BUUM';
            }
        }
    }
}

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
