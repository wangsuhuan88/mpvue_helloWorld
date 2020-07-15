import promisify from './promisify'

const wxDownloadFile = promisify(wx.downloadFile)

/** 当前操作的绘图上下文 */
let context;

/**
 * 在画布上绘制图形
 * @param {object} options - 绘制图形的选项
 * @param {string} options.canvasId - 画布 ID
 * @param {object[]} options.commands - 绘制命令
 * @param {number} options.delay - 绘图延时时间，单位是毫秒
 * @param {string} options.commands[].type - 绘制类型，目前仅支持 'image', 'text', 'rect', 'circle' ,'richText'
 * @param {number} options.commands[].x - 横坐标
 * @param {number} options.commands[].y - 纵坐标
 * @param {number} options.commands[].w - 矩形宽度，仅当 type = 'rect' 时有效
 * @param {number} options.commands[].h - 矩形高度，仅当 type = 'rect' 时有效
 * @param {boolean} options.commands[].circle - 是否进行圆形裁剪，当 type = 'rect' 时有效
 * @param {number} options.commands[].r - 圆半径，仅当 type = 'circle' 时有效
 * @param {string} options.commands[].src - 图片地址，仅当 type = 'image' 有效
 * @param {string} options.commands[].fill - 填充颜色
 * @param {string} options.commands[].stroke - 边框颜色
 * @param {number} options.commands[].strokeWidth - 边框宽度
 * @param {string} options.commands[].text - 字符串数值，仅当 type = 'text' 时有效
 * @param {string} options.commands[].textAlign - 设置文字的水平对齐，仅当 type = 'text' 时有效，有效值包括 'left', 'center', 'right'
 * @param {string} options.commands[].textBase - 设置文字的垂直对齐，仅当 type = 'text' 时有效，有效值包括 'top', 'bottom', 'middle', 'normal'
 * @param {number} options.commands[].fontSize - 字体大小，仅当 type = 'text' 时有效

 * @param {number} options.commands[].lineNumber - 多行文本行数
 * @param {number} options.commands[].richTextDrawWitdh - 多行文本宽度
 * @param {number} options.commands[].font - 多行文本css样式语句
 * @param {number} options.commands[].marginArray - 一组描述交替绘制线段和间距（坐标空间单位）长度的数字
 * @param {number} options.commands[].offsetNumber - 线偏移量
 * @param {number} options.commands[].lineWidth - 线高度
 * @param {number} options.commands[].x1 - 线结束点X坐标
 * @param {number} options.commands[].y1 - 线结束点y坐标
 * @param {number} options.commands[].alpha - 画Reck透明度
 * @param {number} options.commands[].lineHeightRatio - 多行文本间距比率
 * setGlobalAlpha
 */
function draw(options) {
  const { canvasId, commands, delay } = options
  if (!canvasId) throw new Error('Please use a valid canvas id!')
  context = wx.createCanvasContext(canvasId)
  if (!context) throw new Error('Please make sure the canvas whose canvas-id equals "' + canvasId + '" exists!')

  if (!commands) return
  if (commands.length < 1) return

  /** 将绘图命令变为串行绘制，否则无法绘制远程图片 */
  let promise = Promise.resolve('start')

  commands.forEach(item => {
    promise = promise.then(() => {
      return drawItem(context, item)
    })
  })


  /** 绘图需要时间，尤其是远程图片，因此至少延时 800ms(400) 后，才告知外界绘图完成 */
  return promise.then(() => {
    context.draw()
    return delayedCall(delay)
  })
}

/**
 * 延时调用某个函数
 * @param {number} delay - 延时时间，单位是毫秒
 */
function delayedCall(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay)
  })
}

/**
 * 将当前的绘制结果保存到临时文件
 *
 * @param {object} options - 保存选项
 * @param {string} options.canvasId - 画布标识，传入 <canvas/> 的 canvas-id
 * @param {string} options.fileType - 保存图片格式，可选值包括 'jpg, png'
 * @param {number} options.quality - 图片的质量，取值范围为 (0, 1]，不在范围内时当作 1.0 处理
 *
 */
function save(options) {
  const wxSave = promisify(wx.canvasToTempFilePath)
  return wxSave(options).then(res => {
        return res.tempFilePath
    })
}

/**
 * 绘制各种基本图形
 * @param {object} ctx - 绘图上下文
 * @param {object} item - 绘图命令
 * @return {Promise}
 */
function drawItem(ctx, item) {
  if (!ctx) throw new Error('Canvas context should not be empty!')

  const { type } = item
  if (!type) throw new Error('Please use a valid shape type!')

  switch (type) {
    case 'image':
      return drawImage(ctx, item)
      break

    case 'text':
      drawText(ctx, item)
      break

    case 'richText':
      drawrichText(ctx, item)
      break

    case 'line':
      drawLine(ctx, item)
      break

    case 'circle':
      drawCircle(ctx, item)
      break

    case 'rect':
      drawRect(ctx, item)
      break

    default:
      console.log('not yet implement shape of type ' + type)
      return Promise.reject('not yet implement shape of type ' + type)
      break
  }

  return Promise.resolve(type)
}

/** 绘制位图资源 */
function drawImage(ctx, item) {
  const { src, x, y, w, h, circle } = item

  if (!src) throw new Error('Bitmap src should be valid!')
  return getDrawableImage(src)
    .then(path => {
      /** 开始圆形裁剪 */
      if (circle) {
        ctx.save()
        // 圆心坐标
        const cx = x + w / 2
        const cy = y + h / 2
        // 半径
        const rx = w / 2
        // 起始弧度
        const ry = h / 2
        ctx.beginPath()
        // 安卓画不圆
        // ctx.arc(cx, cy, rx, cy, 0, Math.PI * 2)
        // 不需要cy坐标，安卓ok
        ctx.arc(cx, cy, rx, 0, Math.PI * 2)
        ctx.clip()
      }
      ctx.drawImage(path, x, y, w, h)

      if (circle) {
        ctx.restore()
      }
    })
    .catch(err => console.error(err))
}

/** 绘制文本 */
function drawText(ctx, item) {
  const { text, fontSize, textAlign, textBase, fill, x, y, strokeStyle } = item;

  if (!text) return
  // 1.9.0停止维护
  // fill && ctx.setFillStyle(fill);
  fill && (ctx.fillStyle = fill);

  fontSize && ctx.setFontSize(fontSize);


  textAlign && ctx.setTextAlign(textAlign);
  textBase && ctx.setTextBaseline(textBase);

  ctx.fillText(text, x, y);
  if (strokeStyle) {
    ctx.setStrokeStyle(strokeStyle);
    ctx.strokeText(text, x, y);
  }
}
// 画多行文本
function drawrichText(ctx, item) {
  const { text, fontSize, textAlign, textBase, fill, x, y, strokeStyle, lineNumber, richTextDrawWitdh, startY, font, lineHeightRatio } = item

  if (!text) return
  // 1.9.0停止维护
  // fill && ctx.setFillStyle(fill)
  fill && (ctx.fillStyle = fill)


  fontSize && ctx.setFontSize(fontSize)
  textAlign && ctx.setTextAlign(textAlign)
  textBase && ctx.setTextBaseline(textBase)
  font && (ctx.font = font)

  let rows = nextLineFillText(text, ctx, richTextDrawWitdh, lineNumber)

  for (let i = 0; i < rows.length; i++) {
    ctx.fillText(rows[i], x, y + i * 80 * lineHeightRatio, richTextDrawWitdh)
  }

  if (strokeStyle) {
    ctx.setStrokeStyle(strokeStyle)
    ctx.strokeText(text, x, y)
  }
}
// 画线
function drawLine(ctx, item) {
  // 一组描述交替绘制线段和间距（坐标空间单位）长度的数字
  const { marginArray, offsetNumber, lineWidth, x, y, x1, y1, fill } = item
  ctx.beginPath();
  ctx.setLineDash(marginArray, offsetNumber)
  ctx.setLineWidth(lineWidth)
  ctx.moveTo(x, y)
  ctx.lineTo(x1, y1)
  ctx.setStrokeStyle(fill)
  ctx.stroke()
}

// 画圆
function drawCircle(ctx, item) {
  ctx.beginPath()

  const { x, y, r, fill } = item
  ctx.arc(x, y, r, 0, Math.PI * 2)
  // luo 1.9.9 停止维护
  // ctx.setFillStyle(fill)
  ctx.fillStyle = fill

  drawFillAndStroke(ctx, item)
}

function drawRect(ctx, item) {
  ctx.beginPath()

  const { x, y, w, h, alpha } = item
  ctx.rect(x, y, w, h)

  // 1.9.9停止维护
  // ctx.setGlobalAlpha(alpha)
  ctx.globalAlpha = alpha


  drawFillAndStroke(ctx, item)
}

/** 绘制填充和线条，由于这是所有图形公有的部分，因此提取出来 */
function drawFillAndStroke(ctx, item) {
  const { fill, stroke, strokeWidth } = item

  if (fill) {
    // 1.9.0停止维护
    // ctx.setFillStyle(fill)
    ctx.fillStyle = fill

    ctx.fill()
  }

  strokeWidth && ctx.setLineWidth(strokeWidth)

  if (stroke) {
    ctx.setStrokeStyle(stroke)
    ctx.stroke()
  }
}

/**
 * 获取可以绘制的图片地址
 * 由于只有本地图片可以绘制，所以本函数返回图片的本地地址
 *
 * @param {string} img - 图片地址
 * @return {Promise<string>}
 */
function getDrawableImage(img) {
  if (!img) throw new Error('Please use a valid image path.')

  if (isRemote(img)) {
    return wxDownloadFile({ url: img })
      .then(res => {
        return res.tempFilePath
      })
  } else {
    return Promise.resolve(img)
  }
}

/**
 * 判断 img 是否是远程图片
 * @param {string} img - 待检测图片地址
 * @return {boolean}
 */
function isRemote(img) {
  if (!img) throw new Error('Please use a valid url')

  const reg = /^https?:\/\//i;
  return reg.test(img)
}

/**
 * 查询图片尺寸
 * @param {string} url - 待查询图片地址
 *
 */
function auditImageSize(url) {
  const getImageInfo = promisify(wx.getImageInfo)
  return getImageInfo({ src: url })
    .then(res => {
      const { width, height } = res
      return { width, height }
    })
}


// 绘制换行文本 2行
function nextLineFillText(str, context, width, lineNumber) {
  var text = str;//这是要绘制的文本
  var chr = text.split("");//这个方法是将一个字符串分割成字符串数组
  var temp = "";
  var row = [];
  for (var a = 0; a < chr.length; a++) {
    if (context.measureText(temp).width < width) {
      temp += chr[a];
    }
    else {
      a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
      row.push(temp);
      temp = "";
    }
  }
  row.push(temp);

  let arrayLengh = row.length

  if (row.length > lineNumber) {
    var rowCut = row.slice(0, lineNumber);
    var rowPart = rowCut[lineNumber - 1];
    var test = "";
    var empty = [];
    for (var a = 0; a < rowPart.length; a++) {
      if (context.measureText(test).width < width) {
        test += rowPart[a];
      }
      else {
        break;
      }
    }
    empty.push(test);
    var group = empty[0] + "..."//这里只显示两行，超出的用...表示
    rowCut.splice(lineNumber - 1, lineNumber - 1, group);
    row = rowCut;
  }

  return row
}


export default {
  draw,
  save,
  auditImageSize,
}
