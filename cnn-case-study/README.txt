AMP Case Study
--------------------------------------------------
We fetched the files in this directory

    raw-cnn-canonical.txt
    raw-cnn-amp.txt
    raw-google-cdn.txt
        
    raw-google-cdn-html.txt    
    raw-googleapp-cdn.txt
    
using [Charles Proxy](https://www.charlesproxy.com/) running on OS X 10.11.  

### raw-cnn-canonical.txt     

The `raw-cnn-canonical.txt` file is the source document for the following URL

    http://www.cnn.com/2017/01/19/us/dakota-access-pipeline-battle/index.html
    
### raw-cnn-amp.txt
    
The `raw-cnn-amp.txt` file is the source document for the CNN hosted AMP version of the page at 

    https://amp.cnn.com/cnn/2017/01/19/us/dakota-access-pipeline-battle/index.html
    
### raw-google-cdn.txt

The `raw-google-cdn.txt` file is the source document for the Google hosted javascript application that's linked from the news carousel, and loaded fromthe following URL   

    https://www.google.com/amp/s/amp.cnn.com/cnn/2017/01/19/us/dakota-access-pipeline-battle/index.html?client=safari
    
    
### raw-google-cdn-html.txt

The `raw-google-cdn-html.txt` file is an AMP version of the story, hosted at the following URL

    https://cdn.ampproject.org/v/s/amp.cnn.com/cnn/2017/01/19/us/dakota-access-pipeline-battle/index.html
    
The javascript app from `raw-google-cdn.txt` loads the content from this AMP URL.

### raw-googleapp-cdn.txt

The `raw-googleapp-cdn.txt` file is the source document for the page loaded via the Google App for iOS's news carousel.  It comes from the following URL

    https://amp.cnn.com/cnn/2017/01/19/us/dakota-access-pipeline-battle/index.html
    
This is the CNN hosted version of the page, and identical in *content* to `raw-cnn-amp.txt`.  However, the version served for the Google app has some additional HTTP headers that appear to be related to aggressively ensuring the page is **not** cached. 