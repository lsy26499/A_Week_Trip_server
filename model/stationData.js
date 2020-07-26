//station Data를 위한 파일입니다.
// Data => DB로 옮깁니다.

const stationData = {
    station: [
        {
            coord: { lon: 35.1145855, lat: 129.039662 },
            station: '서울역',
            stationNumber: 1,
            info: '서울의 중심지입니다.',
            lodging: [
                {
                    name: '1호점',
                    phone: '010-444-4444',
                    address: '서울시 종로구',
                    info: '좋은곳입니다.',
                },
            ],
            tourism: [
                {
                    name: '인사동',
                    phone: '010-333-3334',
                    address: '인사동 어디엔가',
                    info: '문화를 느낄 수 있는 인사동입니다.',
                },
            ],
            food: [
                {
                    name: '닭한마리',
                    phone: '010-555-5555',
                    address: '종로5가 닭한마리 골목',
                    info: '원조가 100군데',
                },
            ],
        },
    ],
};
