export class TestPatients
{
  private pats: Array<any>;

  getTestPatients(): Array<any> {
    this.pats = [
      {
        identifier: '123',
        name: 'Paiten Item 1',
        fcmToken: 'xyz',
        commThreadId: '1',
        gender: 'm'
      },
      {
        identifier: '124',
        name: 'Paiten Item 2',
        fcmToken: 'xyy',
        commThreadId: '2',
        gender: 'm'
      },
      {
        identifier: '125',
        name: 'Paiten Item 3',
        fcmToken: 'xyz',
        commThreadId: '3',
        gender: 'f'
      },
      {
        identifier: '126',
        name: 'Paiten Item 4',
        fcmToken: 'xyz',
        commThreadId: '4',
        gender: 'm'
      },
      {
        identifier: '127',
        name: 'Paiten Item 5',
        fcmToken: 'xyz',
        commThreadId: '5',
        gender: 'f'
      }
    ]

    return this.pats;
  }
}
