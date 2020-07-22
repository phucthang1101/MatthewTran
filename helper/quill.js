// import dynamic from 'next/dynamic';

// const { emojis } = dynamic(() => import('@nutrify/quill-emoji-mart-picker'), {
//   ssr: false,
// });
// const Emoji = dynamic(() => import('quill-emoji/dist/quill-emoji'), {
//   ssr: false,
// });
// // Custom emoji-list
// const emojiList = [
//   {
//     name: '100',
//     unicode: '1f4af',
//     shortname: ':100:',
//     code_decimal: '&#128175;',
//     category: 's',
//     emoji_order: '2119',
//   },
//   {
//     name: '1234',
//     unicode: '1f522',
//     shortname: ':1234:',
//     code_decimal: '&#128290;',
//     category: 's',
//     emoji_order: '2122',
//   },
//   {
//     name: 'grinning',
//     unicode: '1f600',
//     shortname: ':grinning:',
//     code_decimal: '&#128512;',
//     category: 'p',
//     emoji_order: '1',
//   },
//   {
//     name: 'grin',
//     unicode: '1f601',
//     shortname: ':grin:',
//     code_decimal: '&#128513;',
//     category: 'p',
//     emoji_order: '2',
//   },
//   {
//     name: 'joy',
//     unicode: '1f602',
//     shortname: ':joy:',
//     code_decimal: '&#128514;',
//     category: 'p',
//     emoji_order: '3',
//   },
// ];
// // MDI emojicon instead of default icon
 const emojiIcon =
   '<svg class="i" viewBox="0 0 24 24"><use href="#emoticon-happy"></use></svg>';

export const QuillModules = {
  toolbar: {
    container: [
      [
        { header: '1' },
        { header: '2' },
        { header: [3, 4, 5, 6] },
        { font: [] },
      ],
      [{ size: [] }],
      [{ script: 'super' }, { script: 'sub' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      [{ direction: 'rtl' }], // text direction

      [{ color: [] }, { background: [] }],
      [
        { align: '' },
        { align: 'center' },
        { align: 'right' },
        { align: 'justify' },
      ],
      ['link', 'image', 'video', 'formula'],
      ['clean'],
      ['code-block', 'hr','code-custom'],
    

      // ['code-block', 'my-thing', 'hr','div-class','my-list'],
    ],

  
    // handlers: {
    //   'span-wrapper': function() {
    //     var range = quill.getSelection();
    //     var format = quill.getFormat(range);

    //     if (!format['span-wrapper']) {
    //       quill.format('span-wrapper', 'wrapper');
    //     } else {
    //       quill.removeFormat(range.index, range.index + range.length);
    //     }
    //   }
    // }
    handlers: {
      hr: function (value) {
        this.quill.format('hr', true);
      },
   
      //    'my-thing': function() {
      //     var selection = this.quill.getSelection();
      //     var selectedContent = this.quill.getContents(selection.index, selection.length);
      //     var tempContainer = document.createElement('div')
      //     var tempQuill = new Quill(tempContainer);
      //     tempQuill.setContents(selectedContent);
      //   //  console.log(tempContainer.querySelector('.ql-editor').innerHTML);
      //     var format = this.quill.getFormat(selection);
      //    // console.log(tempQuill)
      //     if (!format['my-thing']) {
      //       this.quill.format('my-thing', 'block');
      //     } else {
      //       this.quill.removeFormat(selection.index, selection.index + selection.length);
      //     }
      // }
    },
  // },
  // 'emoji-module': {
  //   emojiData: emojis,
  //   customEmojiData: [
  //     {
  //       name: 'Party Parrot',
  //       shortNames: ['parrot'],
  //       keywords: ['party'],
  //       imageUrl: './assets/images/parrot.gif',
  //     },
  //     {
  //       name: 'Test Flag',
  //       shortNames: ['test'],
  //       keywords: ['test', 'flag'],
  //       spriteUrl:
  //         'https://unpkg.com/emoji-datasource-twitter@4.0.4/img/twitter/sheets-256/64.png',
  //       sheet_x: 1,
  //       sheet_y: 1,
  //       size: 64,
  //       sheetColumns: 52,
  //       sheetRows: 52,
  //     },
  //   ],
  //   preventDrag: true,
  //   showTitle: true,
  //   indicator: '*',
  //   convertEmoticons: true,
  //   convertShortNames: true,
  //   set: () => 'apple',
  // },
  // toolbar: false,
  }
};

export const QuillFormats = [
  'header',
  'font',
  'size',
  'script',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'align',
  'color',
  'background',
  'link',
  'image',
  'video',
  'code-block',
  
  'hr',
  'code-custom'
  // 'div-class',
  //'my-list'
];
