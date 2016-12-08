/**
 * Created by Khémon on 07/12/2016.
 */
[
  '{{repeat(5, 7)}}',
  {
    id: '{{objectId()}}',
    name: '{{firstName()}} {{surname()}}',
    email: '{{email()}}',
    address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
    latitude: '{{floating(48.800001, 48.900001)}}',
    longitude: '{{floating(2.240001, 2.4199999)}}',
    jobTypes: [
      {
        "id": "1",
        "name": "Ménage"
      },
      {
        "id": "2",
        "name": "Déménagement"
      },
      {
        "id": "3",
        "name": "Bricolage"
      },
      {
        "id": "4",
        "name": "Livraison"
      },
      {
        "id": "5",
        "name": "Baby-Sitting"
      }
    ],
    phone: '+33 {{phone()}}',
    about: '{{lorem(1, "paragraphs")}}',
    registered: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
    age: '{{integer(20, 40)}}',
    picture: 'https://cdn2.iconfinder.com/data/icons/male-users-2/512/6-128.png'
  }
]
