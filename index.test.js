/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */

import { normalize, schema } from 'normalizr';
import { Map as map, Set as set, fromJS } from 'immutable';

import immutableMapper from './index';

// Mock data for announcement
const mockAnnouncement = {
  announcements: [
    {
      id: 1,
      title: '# Lorem Ipsum Dolor Sit Amet',
      createdAt: '2016-11-27T14:16:00.000Z',
      editedAt: '2016-11-27T14:16:00.000Z',
      totalComments: 100,
      author: {
        id: 25,
        name: 'Putra Prawira Tanzil',
        picture: 'http://placehold.it/320x320',
      },
    },
    {
      id: 2,
      title: '# Lorem Ipsum Dolor Sit Amet',
      createdAt: '2016-11-27T14:16:00.000Z',
      editedAt: '2016-11-27T14:16:00.000Z',
      totalComments: 120,
      author: {
        id: 25,
        name: 'Putra Prawira Tanzil',
        picture: 'http://placehold.it/320x320',
      },
    },
  ],
};

const mockAnnouncementTwo = {
  announcements: [
    {
      id: 3,
      title: '# Lorem Ipsum Dolor Sit Memet',
      createdAt: '2016-11-27T14:16:50.000Z',
      editedAt: '2016-11-27T14:17:00.000Z',
      totalComments: 150,
      author: {
        id: 25,
        name: 'Putra Prawira Tanzil',
        picture: 'http://placehold.it/320x320',
      },
    },
    {
      id: 4,
      title: '# Lorem Ipsum Dolor Sit Jemet',
      createdAt: '2016-11-27T14:16:80.000Z',
      editedAt: '2016-11-27T14:18:00.000Z',
      totalComments: 140,
      author: {
        id: 25,
        name: 'Putra Prawira Tanzil',
        picture: 'http://placehold.it/320x320',
      },
    },
  ],
};

const mockAnnouncementCombine = {
  announcements: [
    {
      id: 1,
      title: '# Lorem Ipsum Dolor Sit Amet',
      createdAt: '2016-11-27T14:16:00.000Z',
      editedAt: '2016-11-27T14:16:00.000Z',
      totalComments: 100,
      author: {
        id: 25,
        name: 'Putra Prawira Tanzil',
        picture: 'http://placehold.it/320x320',
      },
    },
    {
      id: 2,
      title: '# Lorem Ipsum Dolor Sit Amet',
      createdAt: '2016-11-27T14:16:00.000Z',
      editedAt: '2016-11-27T14:16:00.000Z',
      totalComments: 120,
      author: {
        id: 25,
        name: 'Putra Prawira Tanzil',
        picture: 'http://placehold.it/320x320',
      },
    },
    {
      id: 3,
      title: '# Lorem Ipsum Dolor Sit Memet',
      createdAt: '2016-11-27T14:16:50.000Z',
      editedAt: '2016-11-27T14:17:00.000Z',
      totalComments: 150,
      author: {
        id: 25,
        name: 'Putra Prawira Tanzil',
        picture: 'http://placehold.it/320x320',
      },
    },
    {
      id: 4,
      title: '# Lorem Ipsum Dolor Sit Jemet',
      createdAt: '2016-11-27T14:16:80.000Z',
      editedAt: '2016-11-27T14:18:00.000Z',
      totalComments: 140,
      author: {
        id: 25,
        name: 'Putra Prawira Tanzil',
        picture: 'http://placehold.it/320x320',
      },
    },
  ],
};

const authorSchema = new schema.Entity('author');
const announcementSchema = new schema.Entity('announcement', { author: authorSchema });
const announcementListSchema = [announcementSchema]

const sets = [
  ['result'],
  ['entities', 'announcement'],
  ['entities', 'author'],
];

const mapOne = fromJS(normalize(mockAnnouncement.announcements, announcementListSchema));
const mapTwo = fromJS(
  normalize(mockAnnouncementTwo.announcements, announcementListSchema)
);
const mapCombine = fromJS(
  normalize(mockAnnouncementCombine.announcements, announcementListSchema)
);

let initialPayload = map({});
initialPayload = initialPayload.set('entities', fromJS({ announcement: {}, author: {} }));
initialPayload = initialPayload.set('result', set([]));

it('should properly map two different sets of data', () => {
  const setOne = immutableMapper(sets, initialPayload, mapOne);
  const setTwo = immutableMapper(sets, setOne, mapTwo);

  expect(setTwo.toJSON()).toEqual(mapCombine.toJSON());
});
