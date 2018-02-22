const Firebase = new function(){
    var config = {
        apiKey: "AIzaSyD6fYU0iI1cmgQ3c1S16MBtXFar39hjLwQ",
        authDomain: "first-webtoon-visualization.firebaseapp.com",
        databaseURL: "https://first-webtoon-visualization.firebaseio.com/",
    };
    firebase.initializeApp(config);

    // Get a reference to the database service
    const database = firebase.database();

    // 가장 큰 장점 .
    // 데이터가 추가되거나 삭제될 때
    // 노티를 받을수 있다.
    // pub sub 이다.

    const refWebtoon = database.ref('/webtoon');
    //const refEp = database.ref('/webtoon/BeforeWarm/episodes');

    /**
     * @param struct
     * @returns {boolean}
     */
    this.sendMessage = function(struct){
        const key = refWebtoon.push().key;
        const summitMessage = {};
        summitMessage[key] = struct;
        refWebtoon.update(summitMessage);
        return true;
    };
    // Create Read

    let childListener = null;
    let epListener = null;

    /**
     * @param event
     */

    /*
    this.setChildListener = event => childListener = event;

    this.setChildListener = function (event) {
        childListener = event;
    };
    */

    // refWebtoon.on('child_added', (snap)=>{
    //     if(childListener !== null) childListener(snap.val());
    // });
    //
    // this.setEpListener = event => epListener = event;
    // refEp.on('child_added', (snap)=>{
    //     if(epListener !== null) epListener(snap.val());
    // });

    this.getInfo = async name => {
      try{
          const ref = database.ref(name);

          // data 가져오고,
          const ret = await ref.once('value');

          // ref 삭제
          //ref.close();
          return ret;
      }catch (err){
          console.log(err.message);
          return err.message;
      }

    };

};