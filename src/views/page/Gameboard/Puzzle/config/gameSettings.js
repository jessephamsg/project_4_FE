export default {
    settings () {
        return {
            0: {
                items: 4,
                winningOrder: [0, 3, 2, 1],
                options: ['L0_A1', 'L0_A2', 'L0_A3'], 
                assets: {
                    1: ['L0_A1_0', 'L0_A1_3', 'L0_A1_2', 'L0_A1_1'],
                    3: ['L0_A1_0','L0_A1_3', 'L0_A1_2' ,'L0_A1_1'],
                    4: ['L0_A3_0','L0_A3_3', 'L0_A3_2' ,'L0_A3_1']
                }
            },
            1: {
                items: 4,
                winningOrder: [0, 2, 3, 1],
                options: ['L1_A1', 'L1_A2', 'L1_A3'], 
                assets: {
                    1: ['L1_A1_0', 'L1_A1_3', 'L1_A1_1', 'L1_A1_2'],
                    2: ['L1_A2_0', 'L1_A2_3', 'L1_A2_1', 'L1_A2_2'],
                    3: ['L1_A3_0', 'L1_A3_3', 'L1_A3_1', 'L1_A3_2'],
                }
            },
            2: {
                items: 4,
                winningOrder: [1, 2, 0, 3],
                options: ['L2_A1', 'L2_A2', 'L2_A3'], 
                assets: {
                    1: ['L2_A1_2', 'L2_A1_0', 'L2_A1_1', 'L2_A1_3'],
                    2: ['L2_A2_2', 'L2_A2_0', 'L2_A2_1', 'L2_A2_3'],
                    3: ['L2_A3_2', 'L2_A3_0', 'L2_A3_1', 'L2_A3_3'],
                }
            }
        }
    }
}