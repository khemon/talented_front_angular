[
  '{{repeat(50, 100)}}',
  {
    id: '{{objectId()}}',
    firstName: '{{firstName()}}',
    lastName: '{{surname()}}',
    email: '{{email()}}',
    address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
    location: {
      latitude: '{{floating(48.800001, 48.900001)}}',
      longitude: '{{floating(2.240001, 2.4199999)}}'
    },
    talent: [
      { "id": "1", "name": "Ménage"},
      { "id": "2", "name": "Déménagement" },
      { "id": "3", "name": "Bricolage" },
      { "id": "4", "name": "Livraison" },
      { "id": "5", "name": "Baby-Sitting" }
    ],
    phone: '+33 {{phone()}}',
    about: '{{lorem(1, "paragraphs")}}',
    registered: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
    age: '{{integer(20, 40)}}',
    picture: '{{random("1","2","3","4","5","6","7","8")}}',
    hourlyRate: '{{integer(10, 40)}}'
  }
]
