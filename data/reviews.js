const reviews = [
  {
    id: 1,
    name: 'Han Nee Quah',
    initial: 'H',
    time: '2 months ago',
    rating: 5,
    profileImage: 'https://lh3.googleusercontent.com/a/ACg8ocJt4xzbfAV6awQV-dSAWOqy7UrmZ2F-LFpEC7557SPvJuyq-Q=w108-h108-p-rp-mo-br100',
    text: 'Every guest in our group truly enjoyed the homestay. There are plenty of games and activities to keep everyone entertained, and a special mention goes to the karaoke room — the sound system is excellent, even better than some karaoke places outside! The check-in process was smooth and hassle-free, and the host’s service was great — very responsive and helpful. There’s also a restaurant just downstairs with decent food; we had a satisfying and convenient breakfast there. Overall, we were very happy with the place and would definitely recommend it.'
  },
  {
    id: 2,
    name: 'Sharon Chai',
    time: '3 months ago',
    initial: 'S',
    rating: 5,
    profileImage: 'https://lh3.googleusercontent.com/a-/ALV-UjUh6wklyfcvjYAmfHBGLRSPKO67OcbAeJoYomADdcmYGwqQ-KzU=w108-h108-p-rp-mo-ba2-br100',
    text: 'One of My Favourite Places! This spot is always a fun time! There\'s a great variety of activities, and you can sing your heart out without a worry. The vibe is cheerful and welcoming. The owner is incredibly kind, helpful, and friendly — really makes the experience even better. Definitely a place I love coming back to!'
  },
  {
    id: 3,
    name: 'phoi yan',
    time: '3 months ago',
    initial: 'B',
    rating: 5,
    profileImage: 'https://lh3.googleusercontent.com/a/ACg8ocK9XZ-C_HZHTkyRjH6huRQtnFUTyTpywBdup5oe72RWYKOpOws=w54-h54-p-rp-mo-br100',
    text: 'Great for birthday celebrations or bachelor parties. Very well-equipped, and the entertainment options are seriously next level. Didn’t expect to enjoy the racing setup so much. Good place to gather and unwind.'
  },
  {
    id: 4,
    name: 'Chris Raffel',
    time: '3 months ago',
    initial: 'C',
    rating: 5,
    profileImage: 'https://lh3.googleusercontent.com/a/ACg8ocKTfQteQjXc231_BEtzLAu0OqiAhkA7H_gwjSmFnnjVeDGfqg=w54-h54-p-rp-mo-br100',
    text: 'Booked this place for a cousins’ weekend getaway.. tbh, no regrets. The VR and racing games were damn fun and the karaoke system is better than some KTVs we’ve been to. Place was clean and spacious. Will come back for sure!'
  },
  {
    id: 5,
    name: 'Eshu Sem',
    time: '9 months ago',
    initial: 'E',
    rating: 5,
    profileImage: 'https://lh3.googleusercontent.com/a/ACg8ocK8zTAQ-A-euvgWcGIQg4A6wtdAy-2_4TT2eZOm39vgwF8_GQ=w54-h54-p-rp-mo-br100',
    text: 'Very nice place really enjoyed the time with my family.. Really good for birthday functions... There is a lot activities to do like karaoke room, vr room, snooker table we will definitely repeat here again 🫰 …'
  },
  {
    id: 6,
    name: 'HOON YANG LEE',
    time: '9 months ago',
    initial: 'H',
    rating: 5,
    profileImage: 'https://lh3.googleusercontent.com/a-/ALV-UjUxmlFed2fR4AD0UmabkNu-NqZcrZCCurIPTZe2DejSI95I-QuaDg=w54-h54-p-rp-mo-br100',
    text: 'Very attentive management, the party is first, almost everything you can play is available, you won\'t feel bored even if you go crazy all day, I will go again'
  },
  {
    id: 7,
    name: '萧婉清',
    time: '9 months ago',
    initial: 'X',
    rating: 5,
    profileImage: 'https://lh3.googleusercontent.com/a-/ALV-UjWsDxIglpNZU82Ous8uKsXzddCP9-WdR-g-E0jHG1KDAhQ3Sf4K=w54-h54-p-rp-mo-br100',
    text: 'Fast responses to messages and incredibly nice staff! Highly recommend staying here if you\'re looking for a relaxing and comfortable place to chill out.'
  },
  {
    id: 8,
    name: 'Teo Xinke',
    time: '10 months ago',
    initial: 'T',
    rating: 5,
    profileImage: 'https://lh3.googleusercontent.com/a/ACg8ocLvGO6tIxrpX6GSyc1KOguB10aDi9GIBgFPFy45TVG9ds-YzQ=w54-h54-p-rp-mo-br100',
    text: 'Fast response in WhatsApp and guide us how to operate the facilities. The place is clean. Good place for small gathering'
  },
  {
    id: 9,
    name: 'May Ng',
    time: '10 months ago',
    initial: 'M',
    rating: 5,
    profileImage: 'https://lh3.googleusercontent.com/a-/ALV-UjVN4VbpZdJs8ecn1kpbyoY0LiQYnTbY9baLFdLzNfw7VdL5nVtfIQ=w54-h54-p-rp-mo-br100',
    text: 'Thanks for nice and hygienic Homestay'
  },
  {
    id: 10,
    name: 'TyT',
    time: '10 months ago',
    initial: 'T',
    rating: 5,
    profileImage: 'https://lh3.googleusercontent.com/a/ACg8ocIBxf5gTL-_SjIFd4EeoAOevGpe2sCKmzHDupcLpbcTjRE3KA=w54-h54-p-rp-mo-ba2-br100',
    text: 'very funny homestay 👍 got many thing to play like ps4, VR, switch, karaoke and more. The place also very clean and comfortable. Very recommend this place for gathering with friends❤️ …'
  }
];

export default reviews;
